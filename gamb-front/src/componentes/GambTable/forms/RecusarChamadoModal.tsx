import GambButton from "../../GambButton/Button";
import {
	ModalCard,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "../../GambModal/modalstyles";
export default function RecusarChamadoModal(props: {
	isModalOpen: boolean;
	closeModal: () => void;
	onSubmit: () => void;
}) {
	const { isModalOpen, closeModal, onSubmit } = props;

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
								onClick={onSubmit}
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
