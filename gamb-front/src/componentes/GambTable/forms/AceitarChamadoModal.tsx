import GambButton from "../../GambButton/Button";
import { ModalCard, ModalFooter, ModalHeader, ModalOverlay} from "../../GambModal/modalstyles";
export default function AceitarChamadoModal(props: {
	isModalOpen: boolean;
	closeModal: () => void;
    onSubmit: () => void;
}): React.JSX.Element{
    const { isModalOpen, closeModal,onSubmit } = props;

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
    return <></>;
}