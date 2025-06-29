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
import {
	getUserActive,
	getUserActiveRole,
	logout,
} from "../../auth/service/AuthStore";

// 1) Importe o hook para acessar dados do usuário

export function Sidebar() {
	// Estados internos do componente
	const [ModalOpen, setModalOpen] = useState(false);
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	// 2) Obtenha dados do usuário e seu papel

	const navigate = useNavigate();

	// Fecha o modal de abrir chamado
	const closeModal = () => setModalOpen(false);

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
		navigate("/login");
	}

	// Abre/fecha o dropdown do usuário
	const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

	// 3) Defina os itens de menu de acordo com o papel do usuário
	function getSidebarItems() {
		switch (getUserActiveRole()) {
			case "gerente":
				return [
					{ to: "/dashboard", label: "Home", icon: <HouseSimple /> },
					{
						to: "#",
						label: "Gerenciar Usuários",
						icon: <FolderUser />,
					},
					{
						to: "#",
						label: "Gerenciar Bolsista",
						icon: <FolderUser />,
					},
					{
						to: "#",
						label: "Gerenciar Tarefas",
						icon: <FolderUser />,
					},
					{
						to: "#",
						label: "Gerar ordem de serviço",
						icon: <FileText />,
					},
					{
						to: "#",
						label: "Gerar termo de responsabilidade",
						icon: <AddressBook />,
					},
				];
			case "professor":
				return [
					{ to: "/dashboard", label: "Home", icon: <HouseSimple /> },
					{
						to: "#",
						label: "Gerenciar Bolsista",
						icon: <FolderUser />,
					},
					{
						to: "#",
						label: "Gerenciar Tarefas",
						icon: <FolderUser />,
					},
					{
						to: "#",
						label: "Gerar ordem de serviço",
						icon: <FileText />,
					},
					{
						to: "#",
						label: "Estatísticas",
						icon: <AddressBook />,
					},
				];
			case "bolsista":
				return [
					{ to: "/dashboard", label: "Home", icon: <HouseSimple /> },
					{
						to: "#",
						label: "Gerenciar Tarefas",
						icon: <FolderUser />,
					},
					{
						to: "#",
						label: "Gerar ordem de serviço",
						icon: <FileText />,
					},
					{
						to: "#",
						label: "Estatísticas",
						icon: <AddressBook />,
					},
				];
			case "cliente":
			default:
				// Outros papéis que não estejam mapeados explicitamente
				return [
					{ to: "/dashboard", label: "Home", icon: <HouseSimple /> },
					{
						to: "#",
						label: "Gerar ordem de serviço",
						icon: <FileText />,
					},
					{
						to: "#",
						label: "Estatísticas",
						icon: <AddressBook />,
					},
				];
		}
	}

	const sidebarItems = getSidebarItems();

	return (
		<>
			<SidebarBody>
				<SidebarContainer>
					<SidebarContent>
						<div>
							<img
								src="logo-side.png"
								alt="Logo Gambi"
								className="gambi-img img-fluid"
							/>

							{/* BOTÃO (Abrir Chamado) */}
							<div className="buttons-conj flex justify-center">
								{/* 
					Exibir "Abrir Chamado" apenas para bolsista OU cliente 
				  */}

								{(getUserActiveRole() === "bolsista" ||
									getUserActiveRole() === "cliente") && (
									<GambButton
										variant="roxo"
										label="Abrir Chamado"
										icon="plus_circle"
										onClick={() => setModalOpen(true)}
										size="large"
										style={{ width: "100%" }}
									/>
								)}
								<GambButton
									variant="inline"
									label={"Voltar"}
									icon={"back"}
									size="large"
									onClick={() => navigate(-1)}
									style={{ width: "100%" }}
								/>
								<GambButton
									variant="inline"
									label={"Tela de Início"}
									icon={"flower"}
									size="large"
									onClick={() => navigate("/")}
									style={{ width: "100%" }}
								/>
							</div>

							{/* MENU LATERAL */}
							<ul>
								{sidebarItems.map((item, index) => (
									<li key={`${item.to}-${index}`}>
										<Link
											to={item.to}
											className={`${
												item.to ===
												window.location.pathname
													? "text-green-600 font-regular border-l-2 border-green-600"
													: ""
											}`}
										>
											{item.icon} {item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* INFORMAÇÕES DO USUÁRIO E DROPDOWN */}
						<UserSpace>
							<User>
								<img
									src={
										`${getUserActive()?.imagem}` ||
										"/public/assets/perfil.png"
									}
									alt="Imagem de perfil"
								/>
								{getUserActive()?.username || "User"} -{" "}
								{getUserActiveRole()}
							</User>
							<div className="flex flex-col-reverse relative">
								{isDropdownOpen && (
									<ItemDropdown className="absolute bottom-full mb-2 left-0 w-full elevacao-def">
										<li className="p-2 hover:bg-gray_500">
											<a
												href="/login"
												onClick={handleLogout}
											>
												<SignOut /> Logout
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

			{/* MODAL PARA ABRIR CHAMADO */}
			<ModalChamadoSubmit
				isModalOpen={ModalOpen}
				closeModal={closeModal}
				onSubmit={onSubmit}
			/>
		</>
	);
}
