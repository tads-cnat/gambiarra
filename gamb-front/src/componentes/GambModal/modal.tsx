import { CloseButton, ModalCard, ModalOverlay } from "./modalstyles";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
	return (
		<ModalOverlay
			isOpen={isOpen}
			onClick={onClose}
		>
			<ModalCard onClick={(e) => e.stopPropagation()}>
				<CloseButton onClick={onClose}>&times;</CloseButton>
				
                {children}

			</ModalCard>
		</ModalOverlay>
	);
}
