export interface ChatMessage {
    id: number;
    user: string;
    text: string;
    time: string;
    side: "left" | "right";
  }
  
  export interface ChatProps {
    messages: ChatMessage[];
  }