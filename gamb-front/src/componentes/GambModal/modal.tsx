import { CloseButton, ModalCard, ModalFooter, ModalHeader, ModalOverlay } from "./modalstyles";
import GambButton from "../GambButton/Button";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children?: React.ReactNode;
	title: string;
	onSubmit?: () => void;
}

export  default function Modal({ isOpen, onClose, children, title, onSubmit }: ModalProps) {
	if (isOpen) {
		return (
			<ModalOverlay
				isOpen={isOpen}
				onClick={onClose}
			>
				
				<ModalCard onClick={(e) => e.stopPropagation()} className="elevacao-def">
				<ModalHeader>
							<h2>{title}</h2>
						</ModalHeader>
					<CloseButton onClick={onClose}>&times;</CloseButton>
					<form onSubmit={onSubmit}>

					{children}
					<ModalFooter>
							<GambButton
								label="Cancelar"
								variant="cinza"
								onClick={onClose}
							/>

							<GambButton
								label="Enviar"
								variant="verde"
								type="submit"
								icon="seta_direita"
							/>
						</ModalFooter>

					</form >

				</ModalCard>
				
			</ModalOverlay>
		);
	}
}
