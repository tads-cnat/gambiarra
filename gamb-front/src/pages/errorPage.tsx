import React from "react";
import desconfiado from "../assets/desconfiado.svg"; // Importando a imagem
import GambButton from "../componentes/GambButton/Button";
import { useNavigate } from "react-router-dom";

export default function ErrorPage(): React.JSX.Element {
	const navigate = useNavigate();
	console.log(window.location.pathname);
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4">
			<img
				src={desconfiado}
				alt="Desconfiado"
			/>
			<h1>404 - Página não encontrada</h1>
			<p>Desculpe, acho que você está perdido. </p>
			<div>
				<GambButton
					variant={"roxo"}
					onClick={() => {
						if (window.location.pathname === "/404") {
              							navigate("/dashboard");

						} else {
              							window.history.back();

						}
					}}
				>
					Perdão! Vou voltar para o meu lugar
				</GambButton>
			</div>
		</div>
	);
}
