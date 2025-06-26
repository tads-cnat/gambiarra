import { LoginCard } from "./componentes/GambLogin/LoginCard";
import { Header } from "../../componentes/GambHeader/Header";
import { Footer } from "../../componentes/GambFooter/Footer";
import { IndexContainer, MarcaGrafica } from "../index/indexstyles";

export function Login() {
	// Este ficheiro deve estar no endpoint configurado como redirect_uri
	const params = new URLSearchParams(window.location.search);
	const code = params.get("code");

	if (code) {
		localStorage.setItem("suap_oauth_code", code);
		window.close(); // Fecha a popup
	}
	return (
		<div>
			<Header />
			<IndexContainer>
				<MarcaGrafica>
					<img
						src="\assets\slogan.png"
						alt="manutenção para todos - ifrn cnat"
					/>
				</MarcaGrafica>
				<LoginCard />
			</IndexContainer>
			<Footer />
		</div>
	);
}
