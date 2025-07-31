import * as Yup from "yup";

const messageRequired = "Campo obrigatório";

export const cadastroSchema = Yup.object()
  .shape({
    cpf: Yup.string()
  .required(messageRequired)
  .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),

    email: Yup.string().email("Email inválido").required(messageRequired),
    username: Yup.string().required(messageRequired),
    password1: Yup.string()
      .required(messageRequired)
      .min(8, "Senha deve ter ao menos 8 caracteres")
      .matches(/[a-z]/, "A senha deve conter letras minúsculas")
      .matches(/[A-Z]/, "A senha deve conter letras maiúsculas")
      .matches(/[0-9]/, "A senha deve conter números")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "A senha deve conter pelo menos 1 carácter especial"
      ),
    password2: Yup.string()
      .required("Confirmação de senha é obrigatória")
      .oneOf([Yup.ref("password1")], "As senhas devem coincidir"),
  })
  .required();



