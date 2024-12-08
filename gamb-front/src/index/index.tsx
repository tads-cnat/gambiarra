import React from "react";
import { Footer } from "../componentes/GambFooter/Footer";
import { Header } from "../componentes/GambHeader/Header";
// import ChamadoService from "../services/models/ChamadoService";
// import { ChamadoSubmit } from "../interfaces/models/iChamado";


export default function Home() {
	


	// const chamados = ChamadoService.listarChamados();
	// const chamado: ChamadoSubmit = {
	// 	titulo: "Exemplo",
	// 	descricao: "descricao bem foda meu parceiro",
	// 	item: {
	// 		modelo: "modelo da lenovo",
	// 		acessorios: [
	// 			{
	// 				nome: "carregador",
	// 			},
	// 		],
	// 	},
	// };
	// function ChamadoSubmit() {
	// 	ChamadoService.criarChamado(chamado).then((response) => {
	// 		console.log(response);

	// 		alert("Chamado criado com sucesso");
	// 		window.location.reload();
	// 	});
	// }

	return ( <>
			<Header />
			<main className="container m-auto">
				<p> Bem vindo ao gambiarra!</p>
			</main>

			<Footer />
			</>
	);
}
