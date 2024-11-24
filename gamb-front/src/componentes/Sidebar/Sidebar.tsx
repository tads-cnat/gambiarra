import { CaretRight, User } from "@phosphor-icons/react";
import { FooterButton } from "../Footer/footerstyle";
import { SidebarContainer, SidebarContent, UserSpace } from "./sidebarstyles";

export function Sidebar() {
    return (
        <SidebarContainer>
            <SidebarContent>
                <div>

                    <img src="\assets\gambi.png" alt="" />
                    <div className="buttons-conj">
                        <FooterButton variant="verde">Chamados</FooterButton>
                        <FooterButton variant="branco">Abrir chamado</FooterButton>
                    </div>

                    <ul>
                        <li><a href="#"><CaretRight />  Gerenciar bolsista</a></li>
                        <li><a href="#"><CaretRight />  Gerar ordem de serviço</a></li>
                        <li><a href="#"><CaretRight /> Gerar termo de responsabilidade</a></li>
                    </ul>
                </div>

                <UserSpace>
                    <User />
                    <p>livia</p>
                </UserSpace>
            </SidebarContent>
        </SidebarContainer>
    )
}