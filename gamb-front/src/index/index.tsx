import { Footer } from "../componentes/GambFooter/Footer";
import { Header } from "../componentes/GambHeader/Header";

import GambButton from "../componentes/GambButton/Button";

function clickButton(): void {
	console.log("botão clicado");
}

export default function Home() {
	return (
		<div>
			<Header />
			<h1>Tela inicial</h1>

			<GambButton
				variant="verde"
				label="Gambi"
				onClick={clickButton}
			/>

			<Footer />
		</div>
	);
}
