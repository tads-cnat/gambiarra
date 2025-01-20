import {
	GithubLogo,
	HouseLine,
	MapTrifold,
	User,
	UsersThree,
} from "@phosphor-icons/react";
import { HeaderContainer, HeaderContent } from "./headerstyle";
import { Link } from "react-router";
import React from "react";

export function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img
					src="\assets\gambi-logo.png"
					alt=""
				/>
				<nav>
					<ul>
						<li>
							<a href="#">
								{" "}
								<HouseLine /> Início
							</a>
						</li>
						<li>
							<a href="#">
								{" "}
								<GithubLogo /> Conheça os criadores
							</a>
						</li>
						<li>
							<a href="#">
								{" "}
								<UsersThree /> Conheça o projeto
							</a>
						</li>
						<li>
							<a href="#">
								{" "}
								<MapTrifold /> Unidades do projeto
							</a>
						</li>
						<li>
							{" "}
							<Link to="dashboard">
								{" "}
								<User /> Login
							</Link>{" "}
						</li>
					</ul>
				</nav>
			</HeaderContent>
		</HeaderContainer>
	);
}
