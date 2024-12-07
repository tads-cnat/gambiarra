import * as Yup from "yup";


export const chamadoSchema = Yup.object().shape({
    titulo: Yup.string()
      .max(100, "O título deve ter no máximo 100 caracteres")
      .required("O título é obrigatório"),
    descricao: Yup.string()
      .max(500, "A descrição deve ter no máximo 500 caracteres")
      .required("A descrição é obrigatória"),
    item: Yup.object().shape({
      modelo: Yup.string().required("O modelo é obrigatório"),
      acessorios: Yup.array()
        .of(
          Yup.object().shape({
            nome: Yup.string().required("O nome do acessório é obrigatório"),
          })
        )
        .min(1, "Deve haver pelo menos um acessório")
        .required("Os acessórios são obrigatórios"),
    }),
  });