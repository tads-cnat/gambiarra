import { LoginCard } from "./componentes/GambLogin/LoginCard";
import { Header } from "../../componentes/GambHeader/Header";
import { Footer } from "../../componentes/GambFooter/Footer";
import { IndexContainer, MarcaGrafica } from "../index/indexstyles";
import slogan  from "../../assets/slogan.png"
export function Login() {

	return (
		<div>
			<Header />
			<IndexContainer>
				<MarcaGrafica>
					<img
						src={slogan}
						alt="manutenção para todos - ifrn cnat"
					/>
				</MarcaGrafica>
				<LoginCard />
			</IndexContainer>
			<Footer />
		</div>
	);
}
