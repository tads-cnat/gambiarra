import { Footer } from "../componentes/Footer/Footer";
import { Header } from "../componentes/Header/Header";
import { Sidebar } from "../componentes/Sidebar/Sidebar";



export function Dashboard() {
    return (
        <div>
            <Header />
            <h1>Dashboard</h1>
            <Sidebar />
            <Footer />
        </div>
    );
}