export interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  code: string;
  status: string; 
  professor: number;
  item: number;
  cliente: number;
  bolsistas: number[];
}

export interface ChamadoDetalhesProps {
  chamado: Chamado;
}
