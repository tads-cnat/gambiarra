export interface Professor {
  id: number;
  username: string;
}

export interface Bolsista {
  id: number;
  username: string;
}

export interface Cliente {
  id: number;
  username: string;
}

export interface Status {
  id: string;
  nome: string;
}

export interface Avaliacao {
  nota: number;
  texto?: string;
}

export interface Item{
  id: number;
  modelo: string;
  diagnostico?: string;
}

export interface Acessorio{
  id: number;
  nome: string;
}

export interface Chamado {
  id: number;
  titulo: string;
  professor?: Professor;
  bolsistas?: Bolsista[];
  cliente: Cliente;
  status: Status;
  code: string;
  avaliacao?: Avaliacao;
  descricao?: string;
  item: Item;
  acessorios?: Acessorio[];
}

export interface ChamadoDetalhesProps {
  chamado: Chamado;
}
