import ChamadoService from "../../../services/models/ChamadoService";
import GambButton from "../../GambButton/Button";
import {
	ModalCard,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "../../GambModal/modalstyles";
export default function EncerrarChamadoModal(props: {
	chamadoId: number | null;
	isModalOpen: boolean;
	closeModal: () => void;
}) {
	const { isModalOpen, closeModal, chamadoId } = props;
	async function handleAction(): Promise<void> {
		await ChamadoService.encerrarChamado(chamadoId ?? 0)
			.then(() => {
				alert("Chamado recusado com sucesso");
			})
			.catch(() => {
				alert("Erro ao recusar chamado");
			})
			.finally(() => {
				window.location.reload();
			});

		closeModal();
	}
	if (isModalOpen) {
		return (
			<>
				<ModalOverlay onClick={closeModal}>
					<ModalCard
						onClick={(e) => e.stopPropagation()}
						className="elevacao-def"
					>
						<ModalHeader>
							<h3>Confirmar Ação - Recusar Chamado</h3>
						</ModalHeader>
						<p>
							Você está <strong>recusando</strong> um chamado
							aberto, essa ação não pode ser desfeita.
						</p>

						<ModalFooter>
							<GambButton
								label="Recusar"
								type="button"
								variant="vermelho"
								size="large"
								onClick={handleAction}
							/>
							<GambButton
								label="Cancelar"
								type="button"
								variant="inline"
								size="large"
								onClick={closeModal}
							/>
						</ModalFooter>
					</ModalCard>
				</ModalOverlay>
			</>
		);
	}
}
