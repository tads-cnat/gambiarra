import {
	AddressBookIcon,
	FileTextIcon,
	FolderUserIcon,
	HouseSimpleIcon,
	SignOutIcon,
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
import {
	getUserActive,
	getUserActiveRole,
	logout,
} from "../../auth/service/AuthStore";
import { isUserExternal } from "../../utils/checkRoleUser";
import logoGambi from "../../assets/logo-side.png";
import tomada from "../../assets/marca-grafica-tomada.png";

// 1) Importe o hook para acessar dados do usuário

export function Sidebar(): React.JSX.Element {
	// Estados internos do componente
	const [ModalOpen, setModalOpen] = useState(false);
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);


	// 2) Obtenha dados do usuário e seu papel

	const navigate = useNavigate();

	// Fecha o modal de abrir chamado
	const closeModal = (): void => setModalOpen(false);

	// Lógica de envio do formulário de chamado
	async function onSubmit(data: ChamadoSubmit): Promise<void> {
		await ChamadoService.criarChamado(data)
			.then(() => {
				alert("Chamado criado com sucesso");
				window.location.reload();
			})
			.catch(() => {
				alert("Erro ao criar chamado:");
			})
			.finally(() => {
				closeModal();
				setModalOpen(false);
			});
	}

	// Lógica de logout
	function handleLogout(): void {
		logout();
		void navigate("/login");
	}

	// Abre/fecha o dropdown do usuário
	const toggleDropdown = (): void => setDropdownOpen(!isDropdownOpen);

	// 3) Defina os itens de menu de acordo com o papel do usuário
	function getSidebarItems(): Array<{
		to: string;
		label: string;
		icon: React.JSX.Element;
	}> {
		const commonItems = {
			home: { to: "/dashboard", label: "Home", icon: <HouseSimpleIcon /> },
			
			abrirChamado: {
				to: "#",
				label: "Abrir Chamado",
				icon: <FolderUserIcon />,
			},

			voltarPagina: {
				to: "#",
				label: "Voltar Pagina",
				icon: <FolderUserIcon />,
			},

			abrirSidebar: {
				to: "#",
				label: "Abrir Sidebar",
				icon: <FolderUserIcon />,
			},

			gerenciarBolsista: {
				to: "#",
				label: "Gerenciar Bolsista",
				icon: <FolderUserIcon />,
			},
			gerenciarTarefas: {
				to: "#",
				label: "Gerenciar Tarefas",
				icon: <FolderUserIcon />,
			},
			ordemServico: {
				to: "#",
				label: "Gerar ordem de serviço",
				icon: <FileTextIcon />,
			},
			estatisticas: {
				to: "#",
				label: "Estatísticas",
				icon: <AddressBookIcon />,
			},
			usuarios: {
				to: "#",
				label: "Gerenciar Usuários",
				icon: <FolderUserIcon />,
			},
			termoResponsabilidade: {
				to: "#",
				label: "Gerar termo de responsabilidade",
				icon: <AddressBookIcon />,
			},
		};

		const role = getUserActiveRole();

		const roleMap: Record<string, Array<keyof typeof commonItems>> = {
			gerente: [
				"home",
				"usuarios",
				"gerenciarBolsista",
				"gerenciarTarefas",
				"ordemServico",
				"termoResponsabilidade",
			],
			professor: [
				"home",
				"gerenciarBolsista",
				"gerenciarTarefas",
				"ordemServico",
				"estatisticas",
			],
			bolsista: [
				"home",
				"gerenciarTarefas",
				"ordemServico",
				"estatisticas",
			],
			cliente: ["home", "ordemServico", "estatisticas"],
			aluno: ["home", "ordemServico", "estatisticas"],
			servidor: ["home", "ordemServico", "estatisticas"],

		};

		const selectedItems = roleMap[role] || roleMap["cliente"];

		return selectedItems.map((key) => commonItems[key]);
	}

	const sidebarItems = getSidebarItems();

	return (
		<>
			<SidebarBody>
				 <SidebarContainer collapsed={isCollapsed}>
					<SidebarContent>
						<div>
							{isCollapsed ? (
								<img
									src={tomada}
									alt="Tomada"
									className={`collapsed-img`}
								/>
							) : (
								<img
									src={logoGambi}
									alt="Logo Gambi"
									className={`gambi-img`}
								/>
							)}

							{/* BOTÃO (Abrir Chamado) */}
							<div className="buttons-conj flex justify-center">
								{/* 
					Exibir "Abrir Chamado" apenas para bolsista OU cliente 
				  */}

								{(isUserExternal()) && (
									<GambButton
										variant="roxo"
										label={isCollapsed ? "" : "Abrir Chamado"}
										icon="plus_circle"
										onClick={() => setModalOpen(true)}
										size="large"
										style={{ width: "100%"}}
									/>
								)}
								<GambButton
									variant="inline"
									label={isCollapsed ? "" : "Voltar"}
									icon={"back"}
									size="large"
									onClick={() => void navigate(-1)}
									style={{ width: "100%", justifyContent: "space-between"}}
								/>
								<GambButton
									variant="inline"
									label={isCollapsed ? "" : "Encolher"}
									icon={"sb"} // não sei pq quando eu coloco o nome desse icone como "sidebar" ele explode a memoria ram do PC
									size="large"
									onClick={() => setIsCollapsed(!isCollapsed)}
									style={{ width: "100%", justifyContent: isCollapsed ? "center" : "space-between"}}
								/>
							</div>

							{/* MENU LATERAL */}
							<ul>
								{sidebarItems.map((item, index) => (
									<li key={`${item.to}-${index}`}>
										<Link
											to={item.to}
											className={`
											flex items-center gap-2 p-2
											${item.to === window.location.pathname ? "text-green-600 font-regular border-l-2 border-green-600" : ""}
											`}
										>
											{item.icon}
											{!isCollapsed && <span>{item.label}</span>}
										</Link>
									</li>
								))}
							</ul>

						</div>

						{/* INFORMAÇÕES DO USUÁRIO E DROPDOWN */}
						<UserSpace>
							
								<User>
									<img
										src={getUserActive()?.imagem || "perfil.png"}
										alt="Imagem de perfil"
									/>
									{!isCollapsed && (
										<>
											{getUserActive()?.username || "Usuário"} - {getUserActiveRole()}
										</>
									)}
								</User>
							<div className="flex flex-col-reverse relative">
								{isDropdownOpen && (
									<ItemDropdown className="absolute bottom-full mb-2 left-0 w-full elevacao-def">
										<li className="p-2 hover:bg-gray_500">
											<a
												href="/login"
												onClick={handleLogout}
											>
												<SignOutIcon /> Logout
											</a>
										</li>
									</ItemDropdown>
								)}
								{!isCollapsed &&(
								<GambButton
									id="multiLevelDropdownButton"
									type="button"
									variant="circle"
									label=""
									icon="list"
									size="large"
									onClick={toggleDropdown}
								/>
								)}
									
							</div>
						</UserSpace>
					</SidebarContent>
				</SidebarContainer>
			</SidebarBody>

			{/* MODAL PARA ABRIR CHAMADO */}
			<ModalChamadoSubmit
				isModalOpen={ModalOpen}
				closeModal={closeModal}
				onSubmit={(data) => { void onSubmit(data); }}
			/>
		</>
	);
}
