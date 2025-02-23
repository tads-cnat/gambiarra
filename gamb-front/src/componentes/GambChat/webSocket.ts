import { useState, useEffect, useRef, useCallback } from "react";

export interface MessageSubmit {
	autor: number;
	chamado: number;
	texto: string;
	data_envio?: string;
}


interface Message {
	id: number;
	autor: {
		id: number;
		username: string;
	};
	chamado: number;
	texto: string;
	data_envio: string;
}

export default function useWebSocket(url: string) {
	const [messages, setMessages] = useState<Message[]>([]); // Armazena mensagens recebidas
	const [connected, setConnected] = useState<boolean>(false); // Estado para controle de conexão
	const socketRef = useRef<WebSocket | null>(null); // Referência para o WebSocket

	const connectWebSocket = useCallback(() => {
		const socket = new WebSocket(url);
		socketRef.current = socket;

		socket.onopen = () => {
			console.log("Conectado ao WebSocket");
			setConnected(true); // Marca como conectado
		};

		// No hook useWebSocket (webSocket.ts)
		socket.onmessage = (event: MessageEvent) => {
			try {
				const response = JSON.parse(event.data);

				// Verifica se a resposta tem a propriedade 'mensagens'
				if (response.mensagens && Array.isArray(response.mensagens)) {
					setMessages(response.mensagens); // Atualiza com o array direto
				} else {
					console.error("Formato de mensagem inválido:", response);
				}
			} catch (error) {
				console.error("Erro ao processar mensagem:", error);
			}
		};

		socket.onerror = (error: Event) => {
			console.error("Erro no WebSocket:", error);
			setConnected(false); // Marca como desconectado em caso de erro
		};

		socket.onclose = () => {
			console.log("WebSocket desconectado. Tentando reconectar...");
			setConnected(false); // Marca como desconectado
			setTimeout(() => {
				connectWebSocket(); // Tenta reconectar após 3 segundos
			}, 3000);
		};
	}, [url]);

	useEffect(() => {
		connectWebSocket(); // Inicializa a conexão

		return () => {
			if (socketRef.current) {
				socketRef.current.close(); // Fecha a conexão ao desmontar
				socketRef.current = null;
			}
		};
	}, [connectWebSocket]);

	const sendMessage = useCallback((message: MessageSubmit | {history: boolean, chamado: number}) => {
		if (
			socketRef.current &&
			socketRef.current.readyState === WebSocket.OPEN
		) {
			console.log("Enviando mensagem:", message);
			socketRef.current.send(JSON.stringify(message));
		} else {
			console.error("WebSocket não está conectado.");
			setConnected(false); // Atualiza o estado de conexão
		}
	}, []);
	const ListMensages = useCallback((chamado_id: number) => {
		if (
			socketRef.current &&
			socketRef.current.readyState === WebSocket.OPEN
		) {
			console.log("Listando mensagens:");
			socketRef.current.send(JSON.stringify({ chamado_id }));
		} else {
			console.error("WebSocket não está conectado.");
			setConnected(false); // Atualiza o estado de conexão
		}
	}, []);

	return { messages, sendMessage, connected, ListMensages };
}
