import { CloseButton, ModalCard, ModalFooter, ModalHeader, ModalOverlay } from "./modalstyles";
import GambButton from "../GambButton/Button";
import React from "react";

interface ModalProps {
	isModalOpen: boolean;
	onClose: () => void;
	children?: React.ReactNode;
	title: string;
	onSubmit?: () => void;
}

export  default function Modal({ isModalOpen, onClose, children, title, onSubmit }: ModalProps) {
	if (isModalOpen) {
		return (
			<ModalOverlay
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
