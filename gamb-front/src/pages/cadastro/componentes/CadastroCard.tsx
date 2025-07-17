import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CadastroSubmit } from "../../../auth/service/register";
import registerService from "../../../auth/service/registerService";
import GambButton from "../../../componentes/GambButton/Button";
import InputField from "../../../componentes/GambInput/Input";
import {
	Card,
	CardButtonArea,
	CardContent,
	ContainerLogin,
	DivButtons,
	Divider,
	OtherLoginButton,
} from "../../login/componentes/GambLogin/LoginCardStyles";
import { cadastroSchema } from "./schema";

import { useNavigate } from "react-router-dom";
import UseMessage from "../../../componentes/GambMessage/Message";

export function CadastroCard(): React.JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<CadastroSubmit>({
		resolver: yupResolver(cadastroSchema),
	});
	const [cadastroIsValid, setCadastroIsValid] = useState<boolean | null>(
		null
	); // Valor inicial como `null`
	const navigate = useNavigate(); // Defina o hook navigate
	const [message, setMessage] = useState<string>("");

	async function handleCadastro(data: CadastroSubmit): Promise<void> {
		setCadastroIsValid(null);
		setMessage("");

		const res = await registerService.register(data);

		if (res.sucesso) {
			setCadastroIsValid(true);
			setMessage(res.mensagem);
			setTimeout(() => {
				void navigate("/login");
			}, 2000);
		} else {
			setCadastroIsValid(false);
			setMessage(res.mensagem);
		}
	}

	useEffect(() => {}, [cadastroIsValid]);

	return (
		<ContainerLogin className="border-gambi">
			<img
				src="robofeio.png"
				alt=""
			/>
			<Divider />
			<Card>
				{/* Renderiza as mensagens com base no estado */}
				{cadastroIsValid === true &&
				!errors.password &&
				!errors.username ? (
					<UseMessage
						type="success"
						text="Cadastro realizado com sucesso!"
					/>
				) : cadastroIsValid === false ? (
					<UseMessage
						type="danger"
						text={message}
					/>
				) : null}

				<form onSubmit={() => void handleSubmit(handleCadastro)}>
					<CardContent>
						<h3>
							Só precisamos de algumas{" "}
							<span>informações... 🤖</span>
						</h3>
						<InputField
							label="CPF *"
							type="text"
							icon="user"
							name="cpf"
							formIsValid={cadastroIsValid}
							error={errors.cpf?.message}
							placeholder="000.000.000-00"
							register={register("cpf")}
						/>
						<InputField
							label="Email *"
							type="email"
							icon="user"
							name="email"
							formIsValid={cadastroIsValid}
							error={errors.email?.message}
							placeholder="exemplo@email.com"
							register={register("email")}
						/>

						<InputField
							label="Nome de usuário *"
							type="text"
							icon="user"
							name="username"
							formIsValid={cadastroIsValid}
							error={errors.username?.message}
							placeholder="Usuario123"
							register={register("username")}
						/>
						<InputField
							label="Senha *"
							type="password"
							icon="lock"
							formIsValid={cadastroIsValid}
							name="password"
							error={errors.password?.message}
							placeholder="Deve ter no minimo 8 caracteres"
							register={register("password")}
						/>

						<InputField
							label="Confirmar Senha *"
							type="password"
							icon="lock"
							formIsValid={cadastroIsValid}
							name="password2"
							error={errors.password2?.message}
							placeholder="Deve ter no minimo 8 caracteres"
							register={register("password2")}
						/>

						<CardButtonArea>
							<GambButton
								variant="verde"
								label={
									isSubmitting
										? "Enviando..."
										: "Concluir cadastro"
								}
								icon="seta_direita"
								type="submit"
								size="large"
								disabled={isSubmitting}
							/>
						</CardButtonArea>
						<OtherLoginButton>
							<p>
								Já uma possui conta?{" "}
								<a
									onClick={() => void navigate("/login")}
									style={{
										cursor: "pointer",
										color: "blue",
										textDecoration: "underline",
									}}
								>
									Faça seu login
								</a>
							</p>

							<h3>Acesse sua conta</h3>
							<DivButtons>
								<GambButton
									variant="branco"
									icon="github"
									type="button"
									size="large"
									// onClick={() => authService.cadastroGithub()}
								>
									<img
										src="suap.svg"
										alt=""
									/>
								</GambButton>
								<GambButton
									variant="branco"
									type="button"
									size="large"
									// onClick={() => authService.cadastroGoogle()}
								>
									<img
										src="google.png"
										alt=""
										style={{ height: "20px" }}
									/>
								</GambButton>
							</DivButtons>
						</OtherLoginButton>
					</CardContent>
				</form>
			</Card>
		</ContainerLogin>
	);
}
