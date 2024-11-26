import GambButton from "../componentes/GambButton/Button";
import { Footer } from "../componentes/GambFooter/Footer";
import { Header } from "../componentes/GambHeader/Header";
import { defaultTheme } from "../styles/themes/default";

export function Dashboard() {
	const style = defaultTheme;

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
			<div className={style.teste}>
				<p>
					Exemplo de como passar classes do tailwind através do styled
					componentes
				</p>
			</div>

			<Footer />
		</div>
	);
}
