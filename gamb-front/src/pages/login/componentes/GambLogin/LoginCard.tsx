import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSubmit } from "../../../../auth/service/auth";
import authService from "../../../../auth/service/authService";
import GambButton from "../../../../componentes/GambButton/Button";
import InputField from "../../../../componentes/GambInput/Input";
import {
	Card,
	CardButtonArea,
	CardContent,
	ContainerLogin,
	DivButtons,
	Divider,
	OtherLoginButton,
} from "./LoginCardStyles";
import { loginSchema } from "./schema";

import { useNavigate } from "react-router-dom";
import UseMessage from "../../../../componentes/GambMessage/Message";
import { openSuapLoginPopup } from "../../../../services/base/suap-client";

export function LoginCard() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSubmit>({
		resolver: yupResolver(loginSchema),
	});
	const [loginIsValid, setLoginIsValid] = useState<boolean | null>(null); // Valor inicial como `null`
	const navigate = useNavigate(); // Defina o hook navigate

	async function handleLogin(data: LoginSubmit): Promise<void> {
		await authService.loginAuth(data).then((response) => {
			if (response.sucesso) {
				setLoginIsValid(true);
				authService.profile().then(() => {
					setTimeout(() => {
						navigate("/dashboard");
					}, 2000);
				});
			} else {
				setLoginIsValid(false);
			}
		});
	}
	useEffect(() => {}, [loginIsValid]);

	return (
		<ContainerLogin className="border-gambi">
			<img
				src="robofeio.png"
				alt=""
			/>
			<Divider />
			<Card>
				{/* Renderiza as mensagens com base no estado */}
				{loginIsValid === true &&
				!errors.password &&
				!errors.username ? (
					<UseMessage
						type="success"
						text="Login realizado com sucesso!"
					/>
				) : loginIsValid === false ? (
					<UseMessage
						type="danger"
						text="Usuário ou senha inválidos!"
					/>
				) : null}

				<form onSubmit={handleSubmit(handleLogin)}>
					<CardContent>
						<h3>
							Olá! bom te ver <span>de novo</span> 🤖
						</h3>
						<InputField
							label="Nome de usuário:"
							type="text"
							icon="user"
							name="username"
							formIsValid={loginIsValid}
							error={errors.username?.message}
							placeholder="Digite seu nome de usuário"
							register={register("username")}
						/>
						<InputField
							label="Senha: "
							type="password"
							icon="lock"
							formIsValid={loginIsValid}
							name="password"
							error={errors.password?.message}
							placeholder="Digite sua senha"
							register={register("password")}
						/>

						<CardButtonArea>
							<a href="#">Esqueci minha senha</a>
							<GambButton
								variant="verde"
								label="Entrar"
								icon="seta_direita"
								type="submit"
								size="large"
							/>
						</CardButtonArea>
						<OtherLoginButton>
							<p>
								Não possui uma conta?{" "}
								<a
									onClick={() => navigate("/cadastro")}
									style={{
										cursor: "pointer",
										color: "blue",
										textDecoration: "underline",
									}}
								>
									Inscreva-se
								</a>
							</p>

							<h3>Acesse sua conta</h3>
							<DivButtons>
								<GambButton
									variant="inline"
									icon="github"
									type="button"
									size="large"
									onClick={
										openSuapLoginPopup
									}
								>
									<img
										src=" suap.svg"
										alt=""
									/>
								</GambButton>
								<GambButton
									variant="inline"
									type="button"
									size="large"
									// onClick={() => authService.loginGoogle()}
								>
									<img
										src=" google.png"
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
