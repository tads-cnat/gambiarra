export interface Message {
  id: number;
  text: string;
  time: string;
  side: "left" | "right";
}

export interface ChatProps {
  chamado_id: number;
}