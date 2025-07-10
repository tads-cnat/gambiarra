import * as Yup from "yup";

const messageRequired = "Campo obrigatório";
export const cadastroSchema = Yup.object()
	.shape({
		cpf: Yup.string().required(messageRequired),
		email: Yup.string().email("Email inválido").required(messageRequired),
		username: Yup.string().required(messageRequired),
		password: Yup.string()
			.required(messageRequired)
			.min(8, "Senha deve ter ao menos 8 caracteres"),
		password2: Yup.string()
			.required("Confirmação de senha é obrigatória")
			.oneOf([Yup.ref("password")], "As senhas devem coincidir"),
	})
	.required();
