import * as Yup from "yup";

export const cadastroSchema = Yup.object().shape({
    cpf: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    username: Yup.string().required("Campo obrigatório"),
    password: Yup.string().required("Campo obrigatório").min(8, "Senha deve ter ao menos 8 caracteres"),
    password2: Yup.string().required("Confirmação de senha é obrigatória").oneOf([Yup.ref("password")], "As senhas devem coincidir"),
}).required();

