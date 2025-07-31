import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TabsContainer, TabButton } from "./StyleGambTabs";
import GambButton from "../GambButton/Button";
import ModalChamadoSubmit from "../Sidebar/forms/abrirChamado/ModalChamadoSubmit";
import { ChamadoSubmit } from "../../interfaces/models/iChamado";
import ChamadoService from "../../services/models/ChamadoService";
import { getUserActiveRole } from "../../auth/service/AuthStore";
import { notification } from 'antd';


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
}: GambTabsProps): React.JSX.Element {
	const navigate = useNavigate();
	const location = useLocation();
	const [ModalOpen, setModalOpen] = useState(false);
	const [api, contextHolder] = notification.useNotification();

	const handleTabChange = (tabId: string): void => {
		onTabChange(tabId);
		const params = new URLSearchParams(location.search);
		params.set("tab", tabId);
		void navigate(`?${params.toString()}`);
	};

	// Fecha o modal de abrir chamado
	const closeModal = () => setModalOpen(false);

	// Lógica de envio do formulário de chamado
	async function onSubmit(data: ChamadoSubmit): Promise<void> {
		await ChamadoService.criarChamado(data)
			.then(() => {
				api.success({
					message: "Chamado criado com sucesso",
					placement: 'top',
				});
				setTimeout(() => {
				window.location.reload();
			}, 2000);
			})
			.catch(() => {
				api.error({
				message: "Erro ao criar chamado",
				placement: 'top',
			});
				setTimeout(() => {
				window.location.reload();
			}, 2000);
			})
			.finally(() => {
				closeModal();
				setModalOpen(false);
			});
	}
	return (
		<>
		{contextHolder}
			<TabsContainer>
				<div className="w-full p-0 align-end flex gap-4">
					{tabs.map((tab) => (
						<TabButton
							key={tab.id}
							$isActive={activeTab === tab.id}
							onClick={() => handleTabChange(tab.id)}
						>
							{tab.label}
						</TabButton>
					))}
				</div>
				{(getUserActiveRole() === "bolsista" ||
					getUserActiveRole() === "cliente") && (
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
				onSubmit={() => void onSubmit}
			/>
		</>
	);
}
