 
import { CadastroCard } from "./componentes/CadastroCard";
import { Header } from "../../componentes/GambHeader/Header";
import { Footer } from "../../componentes/GambFooter/Footer";
import { IndexContainer, MarcaGrafica } from "../index/indexstyles";

export function Cadastro() {
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
                <CadastroCard />
            </IndexContainer>
            <Footer />

        </div>
    );
}

