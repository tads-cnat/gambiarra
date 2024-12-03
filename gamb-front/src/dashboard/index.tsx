import GambButton from "../componentes/GambButton/Button";
import { Footer } from "../componentes/GambFooter/Footer";
import { Header } from "../componentes/GambHeader/Header";
import GambMessage from "../componentes/GambMessage/Message";
import  GambMessage  from "../componentes/GambMessage/Message";
import { defaultTheme } from "../styles/themes/default";
import { Sidebar } from "../componentes/Sidebar/Sidebar";

export function Dashboard() {
	const style = defaultTheme;

    return (
        <div>
            <h1>Dashboard</h1>
            <Sidebar />
        		<div>
          <h1>Dashboard</h1>

        <GambMessage 
          type="success" 
          text="Operation completed successfully!"
          />
        <GambMessage 
          type="info" 
          text="This is an informational message."
          />
        <GambMessage 
          type="warning" 
          text="Please be careful with this action."
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

     </div>
    );
}
