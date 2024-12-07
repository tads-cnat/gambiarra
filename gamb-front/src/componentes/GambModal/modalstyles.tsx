import styled from "styled-components";

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')}; /* Mostrar quando modal estiver aberto */
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const ModalHeader = styled.div`
    display: flex;
    padding: 9px 0px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    font-size: 2rem;

`;

export const ModalCard = styled.div`
       min-width: 32rem;
    padding: 1.25rem;
    background: ${props => props.theme.cores.white};
    border-radius: 30px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 90vh; /* Para limitar a altura e permitir a rolagem se necessário */
    overflow-y: scroll; /* Permite rolar o conteúdo */
    
    
    /* Esconde a barra de rolagem */
    ::-webkit-scrollbar {
        display: none;
    }
    
    /* Adicional para Firefox */
    scrollbar-width: none; /* Para esconder a barra de rolagem no Firefox */

    form {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

export const ModalFooter = styled.div`
    display: flex;
    padding: 11px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    align-self: stretch;
`;
