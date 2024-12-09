import React from "react";
import { Footer } from "../componentes/GambFooter/Footer";
import { Header } from "../componentes/GambHeader/Header";
import GambButton from "../componentes/GambButton/Button";
import authService from "../services/models/authService";
import { loginSubmit } from "../services/models/auth";
// import ChamadoService from "../services/models/ChamadoService";
// import { ChamadoSubmit } from "../interfaces/models/iChamado";
import { useNavigate } from 'react-router-dom';


export default function Home() {
	const navigate = useNavigate(); // Hook do React Router para navegação

	const user: loginSubmit = {
		username: "livia",
		password: "123",
		
	};
	async function handleLogin() {
		authService.loginAuth(user).then((response) => {
			console.log(response);
			alert("Login efetuado com sucesso");
			navigate("/dashboard"); 

		}).catch((error) =>{
			console.log(error);
			alert("Erro ao efetuar login");
		});
	}

	return ( <>
			<Header />
			<main className="container m-auto">

			<GambButton variant="roxo" label="login" onClick={handleLogin}/>
			</main>

			<Footer />
			</>
	);
}
