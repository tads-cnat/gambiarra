import React from "react";
import GambButton from "../../componentes/GambButton/Button";
import { Footer } from "../../componentes/GambFooter/Footer";
import { Header } from "../../componentes/GambHeader/Header";
import {
	CardContainer,
	IndexContainer,
	IndexContent,
	MarcaGrafica,
} from "./indexstyles";
import CardIndex from "../../componentes/GambCardIndex/GambCardIndex";

export default function Home() {
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
					<IndexContent className="border-gambi">
						<div className="apresentacao ">
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

						<div className="roboebotao">
							<img
								className="img-fluid"
								src="\assets\gambi-robozinho.png"
								alt=""
							/>
							<GambButton
								className="botaorobo"
								label="Abrir Chamado"
								variant="roxo"
								size="large"
							/>
						</div>
					</IndexContent>

					<h2>Quais campus estão envolvidos no projeto?</h2>

					<CardContainer>
						<CardIndex
							nomeCampus="Campus Natal Central - IFRN"
							contato="contatolab@gmail.com"
							endereco="Lades - Prédio do NIT, 1° andar"
							professores={11}
							bolsistas={20}
							maquinas={300}
						/>
						<CardIndex
							nomeCampus="Campus Natal Central - IFRN"
							contato="contatolab@gmail.com"
							endereco="Lades - Prédio do NIT, 2° andar"
							professores={235}
							bolsistas={50}
							maquinas={0}
						/>
						<CardIndex
							nomeCampus="Campus Natal Central - IFRN"
							contato="contatolab@gmail.com"
							endereco="Lades - Prédio do NIT, 3° andar"
							professores={11}
							bolsistas={20}
							maquinas={300}
						/>
						<CardIndex
							nomeCampus="Campus Natal Central - IFRN"
							contato="contatolab@gmail.com"
							endereco="Lades - Prédio do NIT, 4° andar"
							professores={11}
							bolsistas={20}
							maquinas={300}
						/>
					</CardContainer>
				</IndexContainer>
			</main>

			<Footer />
		</>
	);
}
