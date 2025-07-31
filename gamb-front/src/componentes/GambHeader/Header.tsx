import {
	GithubLogoIcon,
	HouseLineIcon,
	MapTrifoldIcon,
	UsersThreeIcon,
} from "@phosphor-icons/react";
import { HeaderContainer, HeaderContent } from "./headerstyle";
import { useNavigate } from "react-router-dom";
import GambButton from "../GambButton/Button";
import marcasm from "../../assets/marca-sm.png"

export function Header() {
	const navigate = useNavigate();

	return (
		<HeaderContainer className="border-gambi elevacao-def ">
			<HeaderContent >
				<img
					src={marcasm}
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
								<GithubLogoIcon /> Conheça os criadores
							</button>
						</li>
						<li>
							<button>
								<UsersThreeIcon /> Conheça o projeto
							</button>
						</li>
						<li>
							<button>
								<MapTrifoldIcon /> Unidades do projeto
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
