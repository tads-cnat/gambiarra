import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TabsContainer, TabButton } from "./StyleGambTabs";
import GambButton from "../GambButton/Button";
import { useUser } from "../../auth/service/user";
import ModalChamadoSubmit from "../Sidebar/forms/abrirChamado/ModalChamadoSubmit";
import { ChamadoSubmit } from "../../interfaces/models/iChamado";
import ChamadoService from "../../services/models/ChamadoService";

export interface Tab {
	id: string;
	label: string;
}

export interface GambTabsProps {
	tabs: Tab[];
	activeTab: string;
	onTabChange: (tabId: string) => void;
}

export default function GambTabs({
	tabs,
	activeTab,
	onTabChange,
}: GambTabsProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const [ModalOpen, setModalOpen] = useState(false);

	const handleTabChange = (tabId: string) => {
		onTabChange(tabId);
		const params = new URLSearchParams(location.search);
		params.set("tab", tabId);
		navigate(`?${params.toString()}`);
	};
	const { userActiveRole } = useUser();

	// Fecha o modal de abrir chamado
	const closeModal = () => setModalOpen(false);

	// Lógica de envio do formulário de chamado
	async function onSubmit(data: ChamadoSubmit): Promise<void> {
		ChamadoService.criarChamado(data)
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
	return (<>
		<TabsContainer>
			<div className="w-full p-0 align-end flex gap-4">
				{tabs.map((tab) => (
					<TabButton
						key={tab.id}
						isActive={activeTab === tab.id}
						onClick={() => handleTabChange(tab.id)}
					>
						{tab.label}
					</TabButton>
				))}
			</div>
			{(userActiveRole === "bolsista" ||
				userActiveRole === "cliente") && (
				<GambButton
					variant="inline"
					label="Abrir Chamado"
					icon="plus_circle"
					onClick={() => setModalOpen(true)}
					size="small"
          className="mb-2"
				/>
			)}

			
		</TabsContainer>
    {/* MODAL PARA ABRIR CHAMADO */}
			<ModalChamadoSubmit
      isModalOpen={ModalOpen}
      closeModal={closeModal}
      onSubmit={onSubmit}
    />
    </>
	);
}
