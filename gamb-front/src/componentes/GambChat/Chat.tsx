import React, { useState, useEffect, useRef } from "react";
import {
	ChatContainer,
	ChatHeader,
	ChatBody,
	ChatMessage,
	ChatFooter,
	InputField,
} from "./chatstyle";
import Icon from "../GambIcon/Icon";
import { ChatProps } from "../../interfaces/componentes/iGambChat";
import useWebSocket from "./webSocket";
import { useForm } from "react-hook-form";
import { useUser } from "../../auth/service/user";
import GambButton from "../GambButton/Button";

export default function Chat({ chamado_id }: ChatProps) {
	const chatBodyRef = useRef<HTMLDivElement>(null);
	const { userActive } = useUser();
	const { register, handleSubmit, reset} = useForm<{texto: string}>();
	const { messages, sendMessage, connected } = useWebSocket(
		"ws://localhost:8000/ws/chat/"
	);

	useEffect(() => {}, [messages]);

	useEffect(() => {
		if (connected) {
			sendMessage({ history: true, chamado: chamado_id });
		}
	}, [connected]);


  async function onSubmit(data: {texto: string}): Promise<void> {
    try {
        await sendMessage({
            texto: data.texto,
            chamado: chamado_id,
            autor: userActive?.id || 0,
        });
        reset();
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
    }
};
	return (
		<ChatContainer>
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
								side={
									message.autor.id === userActive?.id
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
						<p
							style={{
								color: "#7f8c8d",
								textAlign: "center",
							}}
						>
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
				<InputField
					placeholder="Digite sua mensagem..."
					{...register("texto")}
				/>
				<GambButton
					label="Enviar"
					variant="roxo"
					icon="send"
					size="small"
					onClick={handleSubmit(onSubmit)}
				/>
			</ChatFooter>
		</ChatContainer>
	);
}
