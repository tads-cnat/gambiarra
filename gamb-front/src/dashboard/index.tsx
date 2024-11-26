import GambButton from "../componentes/Button/GambButton";
import { Footer } from "../componentes/Footer/Footer";
import { Header } from "../componentes/Header/Header";

export function Dashboard() {
	return (
		<div>
			<Header />
			<h1>Dashboard</h1>

			{/* teste botões */}
			<GambButton
				label="Botão Verde"
				variant="verde"
			/>
			<GambButton
				label="Botão Amarelo"
				variant="amarelo"
			/>
			<GambButton
				label="Botão Vermelho"
				variant="vermelho"
			/>
			<GambButton
				label="Botão Roxo"
				variant="roxo"
			/>

			<Footer />
		</div>
	);
}
