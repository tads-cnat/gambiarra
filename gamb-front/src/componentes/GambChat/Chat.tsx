import React, { useState, useEffect, useRef } from "react";
import {
  ChatContainer,
  ChatHeader,
  ChatBody,
  ChatMessage,
  ChatFooter,
  InputField,
  SendButton,
} from "./chatstyle";
import Icon from "../GambIcon/Icon";
import { ChatProps } from "../../interfaces/componentes/iGambChat";

export default function Chat({ initialMessages }: ChatProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const handleScrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    handleScrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      side: "right" as const
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: "Ola, tudo bem com você?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        side: "left" as const
      };
      setMessages(prev => [...prev, botMessage]);
    }, 2000);
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
          <Icon icon={"check"} color="green" />
          <span className="status-text">Chamado aberto em {new Date().toLocaleDateString()}</span>
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
        <InputField
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <SendButton onClick={handleSendMessage}>
          <Icon icon="send" size={18} color="#ffffff" />
          <span className="button-text">Enviar</span>
        </SendButton>
      </ChatFooter>
    </ChatContainer>
  );
}