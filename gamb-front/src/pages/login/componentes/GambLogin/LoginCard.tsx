import React, { useState } from "react";
import InputField from "../../../../componentes/GambInput/Input";
import { Card, CardButtonArea, CardContent } from "./LoginCardStyles";
import GambButton from "../../../../componentes/GambButton/Button";
import axiosInstance from "../../../../services/base/axiosInstance";

export function LoginCard() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			const response = await axiosInstance.post("/login", {
				email,
				password,
			});

			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Card className="border-gambi">
			<CardContent>
				<h3>
					Olá! bom te ver <span>denovo</span> 🤖
				</h3>
				<InputField
					label="Email"
					type="email"
					icon="envelope"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<InputField
					label="Password"
					type="password"
					icon="lock"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<CardButtonArea>
					<GambButton
						variant="verde"
						label="Entrar"
						icon="seta_direita"
						size="large"
						onClick={handleLogin}
					/>
				</CardButtonArea>
			</CardContent>
		</Card>
	);
}
