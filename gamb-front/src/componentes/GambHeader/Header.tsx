import {
	GithubLogo,
	HouseLineIcon,
	MapTrifold,
	User,
	UsersThree,
} from "@phosphor-icons/react";
import { HeaderContainer, HeaderContent } from "./headerstyle";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import GambButton from "../GambButton/Button";
 
=======
>>>>>>> eacccb30155a0fcc82af83a99f9721b0bc1e292c

export function Header() {
	const navigate = useNavigate();

	return (
		<HeaderContainer>
			<HeaderContent>
				<img
					src="marca-sm.png"
					alt=""
				/>
				<nav>
					<ul>
						<li>
							<button
								onClick={() => {
									navigate("/");
								}}
							>
								<HouseLineIcon /> Início
							</button>
						</li>
						<li>
							<button>
								<GithubLogo /> Conheça os criadores
							</button>
						</li>
						<li>
							<button>
								<UsersThree /> Conheça o projeto
							</button>
						</li>
						<li>
							<button>
								<MapTrifold /> Unidades do projeto
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									navigate("/login");
								}}
							>
								<User /> Login
							</button>
						</li>
						<li>
							<GambButton
								onClick={() => {
									navigate("/login");
								}}
								variant="verde"
								label="Acesse já"
								icon="seta_direita"
							 />
						</li>
						
					</ul>
				</nav>
			</HeaderContent>
		</HeaderContainer>
	);
}
