import React from "react";
import {
  ChatContainer,
  ChatHeader,
  ChatBody,
  ChatMessage,
  ChatFooter,
  InputField,
  SendButton
} from "./chatstyle";
import Icon from "../GambIcon/Icon";
import { ChatProps } from "../../interfaces/componentes/iGambChat"; 

const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <ChatContainer>
      <ChatHeader>
        <div className="header-left">
          <img
            src=""
            alt="Avatar"
            className="avatar"
          />
          <span className="username">Nome Usuario</span>
        </div>
      </ChatHeader>

      <ChatBody>
        <div className="inline-flex items-center justify-center gap-1.5">
          <Icon icon={"check"} color="green" />
          <span className="status-text">Chamado aberto do dia 01 de janeiro de 2025</span>
        </div>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} side={msg.side}>
            <div className="bubble">
              <p>{msg.text}</p>
              <span className="time">{msg.time}</span>
            </div>
          </ChatMessage>
        ))}
      </ChatBody>

      <ChatFooter>
        <InputField placeholder="Escreva algo..." />
        <SendButton>Enviar</SendButton>
      </ChatFooter>
    </ChatContainer>
  );
};

export default Chat;