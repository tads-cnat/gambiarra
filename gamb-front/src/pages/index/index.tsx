import GambButton from "../../componentes/GambButton/Button";
import { Footer } from "../../componentes/GambFooter/Footer";
import { Header } from "../../componentes/GambHeader/Header";
// import { MapContainer } from 'react-leaflet/MapContainer'
// import { TileLayer } from 'react-leaflet/TileLayer'
// // import { useMap } from 'react-leaflet/hooks'
// import { Marker } from 'react-leaflet/Marker'
// import { Popup } from 'react-leaflet/Popup'
import { MapContainer, TileLayer, Marker, Popup, } from 'react-leaflet'


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
							src="\assets\slogan.png"
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

					<CardContainer className="row">
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
					<h2>Mapa do Projeto 🌍</h2>
					<MapContainer
						center={[-5.8117861169586735, -35.20454375958056]}
						zoom={10}
						scrollWheelZoom={false}
						style={{ height: "400px", width: "100%", marginTop: "2rem", padding: "2rem" , maxWidth: "1100px"}}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={[-5.8117861169586735, -35.20454375958056]}>
							<Popup  >
							IFRN-CNAT - Campus Natal Central
							</Popup>
						</Marker>
						<Marker position={[-5.749014480391099, -35.26035668704938]}>
							<Popup  >
							IFRN-ZN - Campus Zona Norte
							</Popup>
						</Marker>
					</MapContainer>


				</IndexContainer>

			</main>
		
					

			<Footer />
		</>
	);
}
