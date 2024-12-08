import React from "react";
import GambButton from "../GambButton/Button";
import { FooterContainer, FooterContent } from "./footerstyle";

export function Footer() {
	return (
		<FooterContainer>
			<FooterContent>
				<div className="info">
					<h2><img src="\assets\gambi-footer.png" alt="" /></h2>
                    <div className="buttons">
						<GambButton variant="verde" label="Conheça o projeto" />
						<GambButton variant="branco" label="Conheça os criadores" />
                    </div>
                    <div className="social-links">
                        <a href="#">
                            <img src="https://img.icons8.com/ios-glyphs/30/000000/facebook-new.png" alt="facebook"/>
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios-glyphs/30/000000/instagram-new.png" alt="instagram"/>
                        </a>
                        <a href="#">
                            <img src="https://img.icons8.com/ios-glyphs/30/000000/linkedin.png" alt="linkedin"/>
                        </a>
                    </div>

				</div>
				<nav>
					<ul>
						<li>
							<a href="#">Instituições cadastradas</a>
						</li>
						<li>
							<a href="#">Professores cadastrados</a>
						</li>
						<li>
							<a href="#">bolsistas</a>
						</li>
						<li>
							<a href="#">Mapa do projeto</a>
						</li>
					</ul>
				</nav>
			</FooterContent>
			<div className="copyright">
				<span>© 2024 Gambiarra. All rights reserved.</span>
				<ul>
					<li>
						<a href="#">Terms of Service</a>
					</li>
					<li>
						<a href="#">Privacy Policy</a>
					</li>
					<li>
						<a href="#">voltar ao topo</a>
					</li>
				</ul>
			</div>
		</FooterContainer>
	);
}
