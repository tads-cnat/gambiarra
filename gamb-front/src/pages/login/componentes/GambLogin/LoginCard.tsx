 
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
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
import robo from "../../../../assets/robofeio.png";
import suap from "../../../../assets/suap.svg";
import google from "../../../../assets/google.png";

export function LoginCard(): React.JSX.Element {
	const {
		register,
		handleSubmit, control,
		formState: { errors },
	} = useForm<LoginSubmit>({
		resolver: yupResolver(loginSchema),
	});
	const [loginIsValid, setLoginIsValid] = useState<boolean | null>(null);
	const navigate = useNavigate(); // Defina o hook navigate
	const [ message, setMessage ] = useState<string | null>(null);
	async function handleLogin(data: LoginSubmit): Promise<void> {
		await authService.loginAuth(data).then((response) => {
			setMessage(response.mensagem);
			if (response.sucesso) {
				setLoginIsValid(true);
				void authService.profile().then(() => {
					setTimeout(() => {
						void navigate("/dashboard");
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
				src={robo}
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
						datacypress="success-messageLogin"
						text="Login realizado com sucesso!"
					/>
				) : loginIsValid === false ? (
					<UseMessage
						type="danger"
						datacypress="error-messageLogin"
						text={message || "Erro ao realizar login. Verifique suas credenciais."}
					/>
				) : null}

				<form onSubmit={handleSubmit(handleLogin)}>
					<CardContent>
						<h3>
							Olá! bom te ver <span>de novo</span> 🤖
						</h3>
						<InputField
							name="username"
							label="Nome de usuário:"
							type="text"
							icon="user"
							control={control}
							formIsValid={loginIsValid}
							error={errors.username?.message}
							placeholder="Digite seu nome de usuário"
						/>
						<InputField
							name="password"
							control={control}
							label="Senha: "
							type="password"
							icon="lock"
							formIsValid={loginIsValid}
							error={errors.password?.message}
							placeholder="Digite sua senha"
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
									onClick={() => void navigate("/cadastro")}
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
									onClick={() => {
										openSuapLoginPopup();
									}}
								>
									<img
										src={suap}
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
										src={google}
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
