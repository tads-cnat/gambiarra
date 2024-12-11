import { GithubLogo, HouseLine, MapTrifold, UserCircle, UsersThree } from "@phosphor-icons/react";
import { HeaderContainer, HeaderContent } from "./headerstyle";
import { Link } from "react-router";
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
                        <li> <Link to="dashboard"> <UserCircle size={32} weight="fill" /> </Link> </li>
                    </ul>
                </nav>
            </HeaderContent>
        </HeaderContainer>
    )
}