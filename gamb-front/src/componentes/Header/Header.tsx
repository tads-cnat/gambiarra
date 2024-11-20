import { HeaderContainer, HeaderContent } from "./headerstyle";
import { House } from "@phosphor-icons/react";

export function Header() {
    return(
        <HeaderContainer>
            <HeaderContent>
                <img src="\assets\gambi-logo.png" alt="" />
                <nav>
                    <ul>
                        <i>
                            <House size={32}/>
                        </i>
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