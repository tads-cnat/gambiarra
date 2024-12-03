import GambButton from "../componentes/GambButton/Button";
import { Footer } from "../componentes/GambFooter/Footer";
import { Header } from "../componentes/GambHeader/Header";
import  GambMessage  from "../componentes/GambMessage/Message";
import { defaultTheme } from "../styles/themes/default";

export function Dashboard() {
	const style = defaultTheme;

	return (
		<div>
			<Header />
			<h1>Dashboard</h1>
			
			<GambMessage 
				type="success" 
				text="Operation completed successfully!"
				onClose={() => console.log("Fechar")} 
				/>
			<GambMessage 
				type="info" 
				text="This is an informational message."
				onClose={() => console.log("Fechar")}  
				/>
			<GambMessage 
				type="warning" 
				text="Please be careful with this action."
				onClose={() => console.log("Fechar")}  
				/>

			<GambMessage 
				type="danger" 
				text="An error occurred. Please try again later."
				onClose={() => console.log("Fechar")}  
				/>
			
			{/* teste botões */}
			<GambButton label="Botão Verde" variant="verde"/>
			<GambButton label="Botão Amarelo" variant="amarelo"/>
			<GambButton label="Botão Vermelho" variant="vermelho"/>
			<GambButton label="Botão Roxo" variant="roxo" icon="house" size="medium"/>
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
