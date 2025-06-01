import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GambButton from "../GambButton/Button";
import { FooterContainer, FooterContent } from "./footerstyle";

export function Footer() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/";

    // Função para navegar e rolar até a seção correta
    const handleNavigation = (sectionId: string) => {
        if (isHome) {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate(`/#${sectionId}`);
        }
    };

    // Quando a rota mudar, verifica se há um hash na URL e rola para a seção correta
    useEffect(() => {
        if (location.hash) {
            const sectionId = location.hash.replace("#", "");
            document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);

    return (
        <FooterContainer>
            <FooterContent>
                <div className="info">
                    <h2><img src="/images/gambi-footer.png" alt="Logo Gambiarra" /></h2>
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
                            <button onClick={() => handleNavigation("instituicoes")}>
                                Instituições cadastradas
                            </button>
                        </li>
                        <li>
                            <a href="#">Professores cadastrados</a>
                        </li>
                        <li>
                            <a href="#">Bolsistas</a>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation("mapa")}>
                                Mapa do projeto
                            </button>
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
                        <a href="#">Voltar ao topo</a>
                    </li>
                </ul>
            </div>
        </FooterContainer>
    );
}
