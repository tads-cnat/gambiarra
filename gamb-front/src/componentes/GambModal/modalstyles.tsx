import styled from "styled-components";

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
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
`

export const ModalCard = styled.div`
    min-width: 32rem;
    border: 6px;
    padding: 1.25rem;
    background: ${props => props.theme.cores.white};
    border-radius: 30px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    form {
        margin-top: 2rem;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        input {
            border-radius: 6px;
            border: 1px solid ${props => props.theme.cores.black};
            background:  ${props => props.theme.cores.white};
            color:  ${props => props.theme.cores.black};
            padding: 0.875rem;

            &::placeholder {
                color:  ${props => props.theme.cores.gray_text};
            }
        }

        button[type="submit"] {
            height: 58px;
            border: 0;
            background: ${props => props.theme.cores.green_sucess_primary};
            color: ${props => props.theme.cores.white};
            padding:1rem;
            border-radius: 16px;
            margin-top: 1.5rem;
            cursor: pointer;
        }
    }
`;

export const ModalButtons = styled.div`
    display: flex;
    padding: 11px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    align-self: stretch;
`