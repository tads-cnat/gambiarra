export interface Chamado {
  titulo: string;
  descricao: string;
  cliente: string;
  professor: string;
  bolsistas: string[];
  item: {
    tipo: string;
    modelo: string;
  };
}

export interface ChamadoDetalhesProps {
  chamado: Chamado;
}
