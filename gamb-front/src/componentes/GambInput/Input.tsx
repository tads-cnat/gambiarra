import { InputFieldProps } from "../../interfaces/componentes/iGambInput";
import GambButton from "../GambButton/Button";
import Icon from "../GambIcon/Icon";
import UseMessage from "../GambMessage/Message";
import { InputText } from "./inputsStyle"; // Importando o styled-component
import { useState } from "react";

export default function InputField(props: InputFieldProps): React.JSX.Element {
	const {
		name,
		defaultValue,
		label,
		type = "text",
		placeholder,
		className,
		register,
		textAux,
		error,
		icon,
		formIsValid,
		classNameFather,
	} = props;

	// Estado para alternar o tipo de entrada (exclusivo para campos de senha)
	const [isPasswordVisible, setPasswordVisibility] = useState(false);

	// Determina o tipo de entrada para o campo de senha
	const typeInputPassword = isPasswordVisible ? "text" : "password";

	// Determina o ícone a ser exibido no botão de alternância
	const iconPassword = isPasswordVisible ? "eyeopen" : "eyeclose";

	return (
		<div className={classNameFather}>
			{/* Label do campo */}
			{label && (
				<label
					className="block text-gray-700 mb-2"
					htmlFor={name}
				>
					{label}
				</label>
			)}

			{/* Campo de entrada */}
			{type === "password" ? (
				<InputText
					style={{ padding: 8 }}
					className={className} // Passando o className corretamente
					$isInvalid={!!error || formIsValid === false} // Validando se há erro ou se o formulário não é válido
					$isValid={formIsValid} // Passando a validade do formulário
				>
					<div className="flex items-center justify-center gap-2 w-full">
						{/* Ícone opcional ao lado do campo */}
						<Icon icon={icon || "arquivo"} />

						{/* Campo de entrada para senha */}
						<input
							id={`${name}-input`}
							type={typeInputPassword}
							placeholder={placeholder}
							data-cypress={`${name}-input`}
							{...register}
							defaultValue={defaultValue}
							value={props.value}
						/>

						{/* Botão para alternar a visibilidade da senha */}
						<GambButton
							type="button"
							variant="circle"
							className="p-0"
							size="mediumlg"
							icon={iconPassword}
							onClick={() =>
								setPasswordVisibility(!isPasswordVisible)
							}
						/>
					</div>
				</InputText>
			) : (
				// Campo de entrada para outros tipos
				<InputText
					className={className} // Passando o className corretamente
					$isInvalid={!!error || formIsValid === false} // Verifica se tem erro ou se o formulário não é válido
					$isValid={formIsValid} // Passando a validade do formulário
				>
					<Icon icon={icon || "arquivo"} />
					<input
						id={`${name}-input`}
						type={type}
						placeholder={placeholder}
						data-cypress={`${name}-input`}
						{...register}
						defaultValue={defaultValue}
						value={props.value}
					/>
				</InputText>
			)}

			{/* Texto auxiliar opcional */}
			{textAux && <p className="text-xs text-gray-500">{textAux}</p>}

			{/* Mensagem de erro opcional */}
			{error && (
				<UseMessage
					type="danger"
					text={error}
				/>
			)}
		</div>
	);
}
