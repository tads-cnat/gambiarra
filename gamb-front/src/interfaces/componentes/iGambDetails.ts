export interface Acessorio {
    nome: string;
  }
  
  export interface Item {
    modelo: string;
    acessorios?: Acessorio[];
  }
  
  export interface Chamado {
    id: number;
    titulo: string;
    descricao: string;
    item: Item;
    cliente: string;
    professor?: string;
    bolsistas: string[];
  }
  
  export interface ChamadoDetalhesProps {
    chamado: Chamado;
  }
  