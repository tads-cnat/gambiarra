import ChamadoService from "../../../services/models/ChamadoService";
import GambButton from "../../GambButton/Button";
import { ModalCard, ModalFooter, ModalHeader, ModalOverlay } from "../../GambModal/modalstyles";
export default function AceitarChamadoModal(props: {
    chamadoId: number | null;
	isModalOpen: boolean;
	closeModal: () => void;
}) {
    const { isModalOpen, closeModal, chamadoId } = props;
    async function handleAction(): Promise<void>{
        ChamadoService.aceitarChamado(chamadoId ?? 0)
            .then(() => {
               alert("Chamado aceito com sucesso");
           })
            .catch(() => {
               alert("Erro ao aceitar chamado");
            })
            .finally(() => {
                window.location.reload();
            });
            
        closeModal();
    }
    if(isModalOpen){
        return (
            <>
                <ModalOverlay
				onClick={closeModal}
			    >
                    <ModalCard onClick={(e) => e.stopPropagation()} className="elevacao-def">
                        <ModalHeader>
                                <h4>Confirmar Ação - Aceitar Chamado</h4>
                        </ModalHeader>
                        <p>Você está <strong>aceitando</strong> um chamado aberto, essa ação não pode ser desfeita.</p>

                        <ModalFooter>	
                            <GambButton
                                label="Aceitar"
                                type="button"
                                variant="verde"
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