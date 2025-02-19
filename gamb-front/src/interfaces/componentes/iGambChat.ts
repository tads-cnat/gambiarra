export interface Message {
  id: number;
  text: string;
  time: string;
  side: "left" | "right";
}

export interface ChatProps {
  initialMessages: Message[];
}