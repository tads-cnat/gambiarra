import {
	AddressBook,
	FileText,
	FolderUser,
	HouseSimple,
	SignOut,
} from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import {
	ItemDropdown,
	SidebarBody,
	SidebarContainer,
	SidebarContent,
	User,
	UserSpace,
} from "./sidebarstyles";
import GambButton from "../GambButton/Button";
import { useState } from "react";
import { ChamadoSubmit } from "../../interfaces/models/iChamado";
import ModalChamadoSubmit from "./forms/abrirChamado/ModalChamadoSubmit";
import ChamadoService from "../../services/models/ChamadoService";
 

export function Sidebar() {
	const [ModalOpen, setModalOpen] = useState(false);

	const closeModal = () => setModalOpen(false);
	const navigate = useNavigate();
	async function onSubmit(data: ChamadoSubmit): Promise<void> {
		 (data);
		ChamadoService.criarChamado(data)
			.then((response) => {
				 (response);
				alert("Chamado criado com sucesso");
			})
			.catch(() => {
				alert("Erro ao criar chamado");
			})
			.finally(() => {
				window.location.reload();
			});

		setModalOpen(false);
	}
	function handleLogout(): void {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("user");
		navigate("/login");
	}
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

	return (
		<>
			<SidebarBody>
				<SidebarContainer>
					<SidebarContent>
						<div>
							<img
								src="\assets\gambi.png"
								alt=""
								className="gambi-img"
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
									onClick={() => setModalOpen(true)}
								/>
							</div>

							<ul>
								<li>
									<Link to="/">
										<HouseSimple /> Home
									</Link>
								</li>
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
							<User>
								<img
									src="\assets\perfil.png"
									alt="Imagem de perfil"
								/>
								LiviaVS
							</User>
							<div className="flex flex-col-reverse relative ">
								{isDropdownOpen && (
									<ItemDropdown className="absolute bottom-full mb-2 left-0 w-full elevacao-def">
										<li className="p-2 hover:bg-gray_500">
											<a
												href="/login"
												onClick={handleLogout}
											>
												<SignOut /> logout
											</a>
										</li>
									</ItemDropdown>
								)}
								<GambButton
									id="multiLevelDropdownButton"
									type="button"
									variant="circle"
									label=""
									icon="list"
									size="large"
									onClick={toggleDropdown}
								/>
							</div>
						</UserSpace>
					</SidebarContent>
				</SidebarContainer>
			</SidebarBody>
			<ModalChamadoSubmit
				isModalOpen={ModalOpen}
				closeModal={closeModal}
				onSubmit={onSubmit}
			/>
		</>
	);
}
