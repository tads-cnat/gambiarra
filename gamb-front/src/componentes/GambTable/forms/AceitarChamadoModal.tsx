import ChamadoService from "../../../services/models/ChamadoService";
import GambButton from "../../GambButton/Button";
import { ModalCard, ModalFooter, ModalHeader, ModalOverlay } from "../../GambModal/modalstyles";
export default function AceitarChamadoModal(props: {
    chamadoId: number;
	isModalOpen: boolean;
	closeModal: () => void;
}) {
    const { isModalOpen, closeModal, chamadoId } = props;
    async function handleAction(): Promise<void>{
        ChamadoService.aceitarChamado(chamadoId)
            .then((response) => {
                (response);
                
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
                                <h2>{"Deseja aceitar o chamado?"}</h2>
                        </ModalHeader>
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