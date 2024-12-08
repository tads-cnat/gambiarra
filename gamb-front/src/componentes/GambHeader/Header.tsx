import { GithubLogo, HouseLine, MapTrifold, UsersThree } from "@phosphor-icons/react";
import { HeaderContainer, HeaderContent } from "./headerstyle";
import React from "react";

export function Header() {
    return(
        <HeaderContainer>
            <HeaderContent>
                <img src="\assets\gambi-logo.png" alt="" />
                <nav >
                    <ul>
                        <li><a href="#"> <HouseLine /> Inicio</a></li>
                        <li><a href="#"> <GithubLogo /> Desenvolvedores</a></li>
                        <li><a href="#"> <UsersThree /> Sobre nos</a></li>
                        <li><a href="#"> <MapTrifold /> Mapa do projeto</a></li>
                    </ul>
                </nav>
            </HeaderContent>
        </HeaderContainer>
    )
}