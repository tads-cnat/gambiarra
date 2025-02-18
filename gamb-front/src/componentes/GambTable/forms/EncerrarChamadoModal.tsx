import ChamadoService from "../../../services/models/ChamadoService";
import GambButton from "../../GambButton/Button";
import { ModalCard, ModalFooter, ModalHeader, ModalOverlay } from "../../GambModal/modalstyles";
export default function EncerrarChamadoModal(props: {
    chamadoId: number;
	isModalOpen: boolean;
	closeModal: () => void;
}) {
    const { isModalOpen, closeModal, chamadoId } = props;
    async function handleAction(): Promise<void>{
        ChamadoService.encerrarChamado(chamadoId)
            .then((response) => {
                (response);
                
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
    if(isModalOpen){
        return (
            <>
                <ModalOverlay
				onClick={closeModal}
			    >
                    <ModalCard onClick={(e) => e.stopPropagation()} className="elevacao-def">
                        <ModalHeader>
                                <h2>{"Deseja recusar o chamado?"}</h2>
                        </ModalHeader>
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