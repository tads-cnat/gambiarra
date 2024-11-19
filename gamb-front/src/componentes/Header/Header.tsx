import { HeaderContainer, HeaderContent } from "./headerstyle";

export function Header() {
    return(
        <HeaderContainer>
            <HeaderContent>
                <h1>GAMBI</h1>
                <nav>
                    <ul>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Desenvolvedores</a></li>
                        <li><a href="#">Sobre nos</a></li>
                        <li><a href="#">Mapa do projeto</a></li>
                    </ul>
                </nav>
            </HeaderContent>
        </HeaderContainer>
    )
}