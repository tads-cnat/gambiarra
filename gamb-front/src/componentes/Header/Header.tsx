import { House } from "@phosphor-icons/react";
import { HeaderContainer, HeaderContent } from "./headerstyle";

export function Header() {
    return(
        <HeaderContainer>
            <HeaderContent>
                <img src="\assets\gambi-logo.png" alt="" />
                <nav>
                    <ul>
                        <li><a href="#">
                                <House size={22}/>
                                Inicio
                            </a>
                        </li>
                        <li><a href="#">Desenvolvedores</a></li>
                        <li><a href="#">Sobre nos</a></li>
                        <li><a href="#">Mapa do projeto</a></li>
                        
                    </ul>
                </nav>
            </HeaderContent>
        </HeaderContainer>
    )
}