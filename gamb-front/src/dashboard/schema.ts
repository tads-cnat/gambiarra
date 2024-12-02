import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  email: Yup.string()
    .email("Formato de email inválido")
    .required("Email é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
});
