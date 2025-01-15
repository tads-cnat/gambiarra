import React from "react";
import { Footer } from "../componentes/GambFooter/Footer";
import { Header } from "../componentes/GambHeader/Header";
import { IndexContainer, IndexContent, MarcaGrafica } from "./indexstyles";
import GambButton from "../componentes/GambButton/Button";
import { GambTable } from "../componentes/GambTable/Table";
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

	return (
		<>
			<Header />
			<main className="container m-auto">
				<IndexContainer>
					<MarcaGrafica>
						<img
							src="\assets\marca-grafica.png"
							alt="manutenção para todos - ifrn cnat"
						/>
					</MarcaGrafica>
					<GambTable/>
					<IndexContent>
						<div className="apresentacao">
							<h2>
								Olá! somos o <span>Gambiarra</span> 🤖
							</h2>
							<p>
								um <b>projeto</b> dedicado ao{" "}
								<b>conserto de computadores</b>, idealizado e
								executado por estudantes do Instituto Federal do
								Rio Grande do Norte (<b>IFRN-CNAT</b>). Nosso
								objetivo é <b>fornecer soluções</b> eficientes
								para os
								<b>problemas técnicos</b> dos seus dispositivos,
								com a expertise e a paixão que só os estudantes
								podem oferecer. Conte conosco para resolver suas
								questões de forma <b>rápida e confiável!</b>
							</p>
							<span>gostou da idéia?</span>
							<div className="bottoes">
								<GambButton
									label="Saiba Mais"
									variant="verde"
								/>
								<GambButton
									label="Fale Conosco"
									variant="verde"
								/>
							</div>
						</div>

						<div>
							<GambButton
								label="Abrir Chamado"
								variant="roxo"
								size="large"
							/>
						</div>
					</IndexContent>
				</IndexContainer>
			</main>

			<Footer />
		</>
	);
}
