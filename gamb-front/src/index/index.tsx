import { Footer } from "../componentes/Footer/Footer";
import { Header } from "../componentes/Header/Header";

import GambButton from "../componentes/Button/GambButton";


function clickButton (): void {
    console.log('botão clicado');
}


export default function Home() {
    return (
        <div>
            <Header />
            <h1>Tela inicial</h1>

                <GambButton variant="verde" label="Gambi" onClick={clickButton} />

            <Footer />
        </div>
    );
}