import styled from "styled-components";

export const ChatContainer = styled.div`
  border: 1px solid #564CCF;
  border-radius: 2px;
  width: 100%;
  height: 350px; 
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const ChatHeader = styled.div`
  background-color: #564CCF;
  color: #fff;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .username {
      font-weight: bold;
      font-size: 1rem;
    }
  }

  .header-center {
    display: flex;
    align-items: center;
    gap: 8px;

    .status-text {
      font-size: 0.9rem;
    }
  }
`;

export const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow-y: auto; 
  max-height: 400px; 
`;

interface ChatMessageProps {
  side: "left" | "right";
}

export const ChatMessage = styled.div<ChatMessageProps>`
  display: flex;
  justify-content: ${({ side }) =>
    side === "right" ? "flex-end" : "flex-start"};
  margin-bottom: 16px;

  .bubble {
    background-color: ${({ side }) =>
      side === "right" ? "#f1f1f1" : "#e0e0ff"};
    color: #333;
    border-radius: 16px;
    padding: 8px 12px;
    max-width: 60%;
    position: relative;

    p {
      margin: 0;
      font-size: 0.95rem;
    }

    .time {
      font-size: 0.75rem;
      color: #666;
      display: block;
      margin-top: 4px;
      text-align: right;
    }
  }
`;

export const ChatFooter = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
  padding: 12px 16px;
  background-color: #fafafa;
  gap: 8px;
`;


