import GambButton from "../../GambButton/Button";
import {
	ModalCard,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "../../GambModal/modalstyles";
export default function ArquivarChamadoModal(props: {
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
							<h3>Confirmar Ação - Arquivar Chamado</h3>
						</ModalHeader>
						<p>
							Você está <strong>arquivando</strong> um chamado
							fechado, essa ação não pode ser desfeita.
						</p>

						<ModalFooter>
							<GambButton
								label="Arquivar"
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
