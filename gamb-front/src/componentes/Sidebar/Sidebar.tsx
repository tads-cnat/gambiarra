import { AddressBook, FileText, FolderUser, User } from "@phosphor-icons/react";
import {
	SidebarBody,
	SidebarContainer,
	SidebarContent,
	UserSpace,
} from "./sidebarstyles";
import GambButton from "../GambButton/Button";

export function Sidebar() {
	return (
		<SidebarBody>
			<SidebarContainer>
				<SidebarContent>
					<div>
						<img
							src="\assets\gambi.png"
							alt=""
						/>
						<div className="buttons-conj flex items-end">
							<GambButton
								variant="verde"
								label="Chamados"
								icon="seta_direita"
							/>
							<GambButton
								variant="roxo"
								label="Abrir Chamado"
								icon="seta_direita"
							/>
						</div>

						<ul>
							<li>
								<a href="#">
									<FolderUser /> Gerenciar bolsista
								</a>
							</li>
							<li>
								<a href="#">
									<FileText /> Gerar ordem de serviço
								</a>
							</li>
							<li>
								<a href="#">
									<AddressBook /> Gerar termo de
									responsabilidade
								</a>
							</li>
						</ul>
					</div>

					<UserSpace>
						<User />
						<p>livia</p>
						<button>asd</button>
					</UserSpace>
				</SidebarContent>
			</SidebarContainer>
		</SidebarBody>
	);
}
