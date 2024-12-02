import { FieldError} from "react-hook-form";

export interface InputFieldProps {
    /**
     * Nome do campo no formulário, usado para identificação no React Hook Form.
     */
    name: string;
  
    /**
     * Controlador do React Hook Form, fornecido pelo `useForm`.
     */
    control: any;
  
    /**
     * Rótulo a ser exibido junto ao campo de input (opcional).
     */
    label?: string;
  
    /**
     * Tipo do input (e.g., "text", "email", "password").
     * Padrão: "text".
     */
    type?: string;
  
    /**
     * Placeholder a ser exibido dentro do campo de input.
     */
    placeholder?: string;
  
    /**
     * Valor padrão do campo ao inicializar o formulário.
     */
    defaultValue?: string | number;
  
    /**
     * Regras de validação para o campo, como exigência ou tamanho mínimo.
     * Compatível com as regras do React Hook Form.
     */
    rules?: object;
  
    /**
     * Classe CSS personalizada para estilização do campo.
     */
    className?: string;
  
    /**
     * Mensagem de erro a ser exibida caso o campo não passe na validação.
     */
    errorMessage?: string | undefined;

    textAux?: string;
}
  