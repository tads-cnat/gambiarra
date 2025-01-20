import React, { useState } from "react";
import InputField from "../GambInput/Input";
import { Card, CardButtonArea, CardContent } from "./LoginCardStyles";
import GambButton from "../GambButton/Button";

export function LoginCard() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			const response = await api.post("/login", {
				email,
				password,
			});

			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Card>
			<CardContent>
				<h3>
					Olá! bom te ver <span>denovo</span> 🤖
				</h3>
				<InputField
					label="Email"
                    type="email"
                    icon="mail"
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
