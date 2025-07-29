import { useEffect, useRef } from "react";
import {
	ChatContainer,
	ChatHeader,
	ChatBody,
	ChatMessage,
	ChatFooter,
} from "./chatstyle";
import Icon from "../GambIcon/Icon";
import { ChatProps } from "../../interfaces/componentes/iGambChat";
import useWebSocket from "./webSocket";
import { useForm } from "react-hook-form";
import { getUserActive } from "../../auth/service/AuthStore";
import GambButton from "../GambButton/Button";
import InputField from "../GambInput/Input";
import { wsHOST } from "../../services/base/axiosInstance";

export default function Chat({ chamado_id }: ChatProps) {
	const chatBodyRef = useRef<HTMLDivElement>(null);

	const { handleSubmit, reset, control} = useForm<{ texto: string }>();

	const { messages, sendMessage, connected } = useWebSocket(
		`${wsHOST}/${chamado_id}/`
	);

	const css = `
    .input-chat > div > div {
      border: 1px solid #d1d1d1 !important;
    }
  `;
	// armaria
	useEffect(() => {
		if (chatBodyRef.current) {
			chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
		}
	}, [messages]);

	useEffect(() => {
		if (connected) {
			sendMessage({ history: true, chamado: chamado_id });
		}
	}, [connected]);

	async function onSubmit(data: { texto: string }): Promise<void> {
		// Resetando o formulário depois de enviar a mensagem
		reset({ texto: "" });

		try {
			await sendMessage({
				texto: data.texto,
				chamado: chamado_id,
				autor: getUserActive()?.id || 0,
			});
		} catch (error) {
			console.error("Erro ao enviar mensagem:", error);
		}
	}

	return (
		<ChatContainer>
			<style dangerouslySetInnerHTML={{ __html: css }} />

			<ChatHeader>
				<div className="header-left">
					<span className="username">Suporte Técnico</span>
				</div>
			</ChatHeader>

			<ChatBody ref={chatBodyRef}>
				<div className="inline-flex items-center justify-center gap-1.5 mb-4">
					<Icon
						icon={"check"}
						color="green"
					/>
					<span className="status-text">
						Chamado aberto em {new Date().toLocaleDateString()}
					</span>
				</div>

				{connected ? (
					messages.length > 0 ? (
						messages.map((message) => (
							<ChatMessage
								key={message.id}
								$side={
									message.autor.id === getUserActive()?.id
										? "right"
										: "left"
								}
							>
								<div className="bubble">
									<p>{message.texto}</p>
									<span className="time">
										{new Date(
											message.data_envio
										).toLocaleString("pt-BR")}
									</span>
								</div>
							</ChatMessage>
						))
					) : (
						<p style={{ color: "#7f8c8d", textAlign: "center" }}>
							Nenhuma mensagem recebida
						</p>
					)
				) : (
					<p style={{ color: "#e74c3c", textAlign: "center" }}>
						Desconectado do WebSocket
					</p>
				)}
			</ChatBody>

			<ChatFooter>
				<form className="w-full flex items-center gap-2">
					<div className="input-chat w-full">
						<InputField
							name="texto"
							placeholder="Digite sua mensagem..."
							icon="chat"
							type="text"
							control={control}
						/>
					</div>
					<GambButton
						label="Enviar"
						variant="roxo"
						style={{ fontSize: "0.8rem" }}
						onClick={handleSubmit(onSubmit)} // Chama o handleSubmit ao enviar
					/>
				</form>
			</ChatFooter>
		</ChatContainer>
	);
}
