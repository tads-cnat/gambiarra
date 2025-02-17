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
import { useUser } from "../../auth/service/user";
  
  // 1) Importe o hook para acessar dados do usuário

  
  export function Sidebar() {
	// Estados internos do componente
	const [ModalOpen, setModalOpen] = useState(false);
	const [isDropdownOpen, setDropdownOpen] = useState(false);
  
	// 2) Obtenha dados do usuário e seu papel
	const { userActive, userActiveRole } = useUser();
  
	const navigate = useNavigate();
  
	// Fecha o modal de abrir chamado
	const closeModal = () => setModalOpen(false);
  
	// Lógica de envio do formulário de chamado
	async function onSubmit(data: ChamadoSubmit): Promise<void> {
	  try {
		const response = await ChamadoService.criarChamado(data);
		alert("Chamado criado com sucesso");
		console.log(response);
		window.location.reload();
	  } catch (error) {
		alert("Erro ao criar chamado");
	  } finally {
		setModalOpen(false);
	  }
	}
  
	// Lógica de logout
	function handleLogout(): void {
	  localStorage.removeItem("access_token");
	  localStorage.removeItem("refresh_token");
	  localStorage.removeItem("user");
	  navigate("/login");
	}
  
	// Abre/fecha o dropdown do usuário
	const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  
	console.log("userActive", userActive?.email);


	// 3) Defina os itens de menu de acordo com o papel do usuário
	function getSidebarItems() {
	  switch (userActiveRole) {
		case "gerente":
		  return [
			{ to: "/", label: "Home", icon: <HouseSimple /> },
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
			{ to: "/", label: "Home", icon: <HouseSimple /> },
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
			{ to: "/", label: "Home", icon: <HouseSimple /> },
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
			}

		  ];
		case "cliente":
		default:
		  // Outros papéis que não estejam mapeados explicitamente
		  return [
			{ to: "/", label: "Home", icon: <HouseSimple /> },
			{
				to: "#",
				label: "Gerar ordem de serviço",
				icon: <FileText />,
			},
			{
				to: "#",
				label: "Estatísticas",
				icon: <AddressBook />,
			}
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
				  src="\assets\gambi.png"
				  alt="Logo Gambi"
				  className="gambi-img"
				/>
  
				{/* BOTÃO (Abrir Chamado) */}
				<div className="buttons-conj flex justify-center">
 
				  {/* 
					Exibir "Abrir Chamado" apenas para bolsista OU cliente 
				  */}
				  {(userActiveRole === "bolsista" ||
					userActiveRole === "cliente") && (
					<GambButton
					  variant="roxo"
					  label="Abrir Chamado"
					  icon="plus_circle"
					  onClick={() => setModalOpen(true)}
					  size="large"
					/>
				  )}
				</div>
  
				{/* MENU LATERAL */}
				<ul>
				  {sidebarItems.map((item) => (
					<li key={item.to}>
					  <Link to={item.to}>
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
					src="\assets\perfil.png"
					alt="Imagem de perfil"
				  />
				  {userActive?.username || "User"}
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
  