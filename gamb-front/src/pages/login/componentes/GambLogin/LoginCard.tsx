import React from "react";
import InputField from "../../../../componentes/GambInput/Input";
import { Card, CardButtonArea, CardContent } from "./LoginCardStyles";
import GambButton from "../../../../componentes/GambButton/Button";
import { useForm } from "react-hook-form";
import { LoginSubmit } from "../../../../auth/service/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./schema";
import authService from "../../../../auth/service/authService";

export function LoginCard() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSubmit>({
		resolver: yupResolver(loginSchema),
	});

	async function handleLogin(data: LoginSubmit): Promise<void> {
		try {
			const response = await authService.loginAuth(data);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<Card className="border-gambi">
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
						error={errors.username?.message}
						placeholder="Digite seu nome de usuário"
						register={register("password")}
					/>
					<InputField
						label="Senha: "
						type="password"
						icon="lock"
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
							size="large"
							type="submit"
						/>
					</CardButtonArea>
				</CardContent>
			</form>
		</Card>
	);
}
