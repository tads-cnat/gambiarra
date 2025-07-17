// src/auth/service/registerService.ts
import axiosInstance from "../../services/base/axiosInstance";
import BaseService from "../../services/base/baseService";
import { CadastroSubmit } from "./register";


// Interface de resposta
export interface Mensagem {
  sucesso: boolean;
  mensagem: string;
}

class RegisterService extends BaseService {
  /**
   * Realiza o registro de um novo usuário
   */
  async register(data: CadastroSubmit): Promise<Mensagem> {
    try {
      const response = await axiosInstance.post(
        `${this.serviceUrl}/auth/register/`,
        data
      );

      if (response.status === 201 || response.status === 200) {
        return { sucesso: true, mensagem: "Cadastro realizado com sucesso!" };
      }

      return { sucesso: false, mensagem: "Erro ao realizar cadastro." };
    } catch (error: any) {
      const status = error.response?.status;
      let mensagem = error.response?.data?.detail || error.message;

      if (status === 400) {
        mensagem = "Dados inválidos ou usuário já existe.";
      } else if (status === 409) {
        mensagem = "Usuário já cadastrado.";
      } else if (status === 500) {
        mensagem = "Erro interno no servidor.";
      }

      return { sucesso: false, mensagem };
    }
  }
}

export default new RegisterService("");
