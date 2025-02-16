import {
	Control,
	RegisterOptions,
	UseFormRegisterReturn,
} from "react-hook-form";

export interface InputFieldProps {
	/**
	 * Nome do campo no formulário, usado para identificação no React Hook Form.
	 */
	name?: string;

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
	rules?: RegisterOptions;

	/**
	 * Classe CSS personalizada para estilização do campo.
	 */
	className?: string;

	/**
	 * Mensagem de erro a ser exibida caso o campo não passe na validação.
	 */
	error?: string;

	/**
	 * Controlador do formulário para campos com Controller.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control?: Control<any>;

	/**
	 * Texto auxiliar para o campo.
	 */
	textAux?: string;

	/**
	 * Função do React Hook Form para registrar o campo.
	 */
	register: UseFormRegisterReturn;

	formIsValid?: boolean | null;

	value?: string;

	icon?: string;
}
