import { useForm } from "react-hook-form";
import GambButton from "../componentes/GambButton/Button";
import InputField from "../componentes/GambInput/Input";
import { defaultTheme } from "../styles/themes/default";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./schema";

export function Dashboard() {
  const style = defaultTheme;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema), // Adiciona o resolver do schema
  });

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
  };

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          name="email"
          control={control}
          label="Email"
          placeholder="Digite seu email"
          type="email"
          errorMessage={errors.email?.message} // Exibe mensagem de erro
        />
        <InputField
          name="password"
          control={control}
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          errorMessage={errors.password?.message} // Exibe mensagem de erro
        />
        <GambButton variant="roxo" type="submit" label="Enviar" />
      </form>
  );
}
