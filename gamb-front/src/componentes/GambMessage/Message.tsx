import { MessageProps } from "../../interfaces/componentes/iGambMessage";
import Icon from "../GambIcon/Icon";
import {
    CloseButton,
    MessageContainer,
    MessageIcon,
    MessageText,
    MessageWrapper,
} from "./messagestyle";
import React, { useState } from "react";

export default function UseMessage(props: MessageProps): JSX.Element {
    const { type, text, viewClose } = props;
    const [show, setShow] = useState(true);

    // Função para fechar a mensagem
    function onClose() {
        setShow(false);  // Muda o estado para false, fechando a mensagem
    }
    // Renderiza a mensagem apenas se `show` for true
    if (!show) {
        return <></>;  // Se a mensagem não deve ser exibida, retorna vazio
    } else {
        return (
            <MessageContainer>
                <MessageWrapper type={type}>
                    <MessageIcon type={type}>
                        {type === "success" && (
                            <Icon icon="checkcircle" size={26} />
                        )}
                        {type === "info" && (
                            <Icon icon="info" size={26} />
                        )}
                        {type === "warning" && (
                            <Icon icon="warning" size={26} />
                        )}
                        {type === "danger" && (
                            <Icon icon="danger" size={26} />
                        )}
                    </MessageIcon>
                    <MessageText>{text}</MessageText>
                    {viewClose && (
                        <CloseButton type={type} onClick={onClose}>
                            <Icon icon="close" size={24} />
                        </CloseButton>
                    )}
                </MessageWrapper>
            </MessageContainer>
        );
    }
}
