import { ButtonGeneric } from "../componentes/Button/buttonstyle";
import { Footer } from "../componentes/Footer/Footer";
import { Header } from "../componentes/Header/Header";



export function Dashboard() {
    return (
        <div>
            <Header />
            <h1>Dashboard</h1>

            {/* teste botões */}
            <ButtonGeneric variant="amarelo">Gambi</ButtonGeneric>
            <ButtonGeneric variant="branco">Gambi</ButtonGeneric>
            <ButtonGeneric variant="roxo">Gambi</ButtonGeneric>
            <ButtonGeneric variant="verde">Gambi</ButtonGeneric>
            <ButtonGeneric variant="vermelho">Gambi</ButtonGeneric>

            <Footer />
        </div>
    );
}