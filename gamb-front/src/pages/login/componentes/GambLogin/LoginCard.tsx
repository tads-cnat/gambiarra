import InputField from "../../../../componentes/GambInput/Input";
import { Card, CardButtonArea, CardContent } from "./LoginCardStyles";
import GambButton from "../../../../componentes/GambButton/Button";
import { useForm } from "react-hook-form";
import { LoginSubmit } from "../../../../auth/service/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./schema";
import authService from "../../../../auth/service/authService";
import { useEffect, useState } from "react";
 
import UseMessage from "../../../../componentes/GambMessage/Message";
import { useNavigate } from "react-router-dom";

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
	useEffect(() => {
		 (loginIsValid);
	}, [loginIsValid]);

	return (
		<Card className="border-gambi">
			{/* Renderiza as mensagens com base no estado */}
			{loginIsValid === true && !errors.password && !errors.username ? (
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
						Olá! bom te ver <span>denovo</span> 🤖
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
						<GambButton
							variant="verde"
							label="Entrar"
							icon="seta_direita"
							type="submit"
						/>
					</CardButtonArea>
				</CardContent>
			</form>
		</Card>
	);
}
