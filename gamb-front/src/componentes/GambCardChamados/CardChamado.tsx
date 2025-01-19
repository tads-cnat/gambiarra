import React from "react";
import {
    CardChamadoContainer,
    CardChamadoWrapper,
    CardChamadoIcon,
    CardChamadoText,
    CardChamadoText2,
    TextContainer,

} from "./cardchamadostyle";
import Icon from "../GambIcon/Icon";
import { CardChamadoProps } from "../../interfaces/componentes/iGambCardChamado";

export default function CardChamado({
	userType,
	messageType,
    quantity,
    
}: CardChamadoProps) {

    const getText = ({ messageType, userType }) => {
        if (messageType === "atribuidas" && userType === "bolsista") {
            return "Atribuídas";
        }
        if (messageType === "atribuidas" && userType === "professor") {
            return "Recebidos";
        }
        if (messageType === "atribuidas" && userType === "cliente") {
            return "Cadastrados";
        }
        if (messageType === "concluidas" && userType === "bolsista") {
            return "Concluídas";
        }
        if (messageType === "concluidas" && userType === "professor") {
            return "Concluídos";
        }
        if (messageType === "concluidas" && userType === "cliente") {
            return "Resolvidos";
        }
        if (messageType === "pendentes" && ["bolsista", "professor", "cliente"].includes(userType)) {
            return "Pendentes";
        }
        if (messageType === "recusadas" && userType === "cliente") {
            return "Recusados";
        }
        return "Status desconhecido.";
    };
    

	return (
		<CardChamadoContainer>
            <CardChamadoWrapper type={messageType}>
                <CardChamadoIcon type={messageType}>
                    {messageType === "atribuidas" ? <Icon icon="usercircleplus" size={100} className="thin-icon" /> : null}
                    {messageType === "concluidas" ? <Icon icon="usercirclecheck" size={100} /> : null}
                    {messageType === "pendentes" ? <Icon icon="usercirclegear" size={100} /> : null}
                    {messageType === "recusadas" ? <Icon icon="usercircleminus" size={100}  /> : null}
                </CardChamadoIcon>
                <TextContainer>
                    <CardChamadoText type={messageType}>
                        {quantity} {userType === "bolsista" ? "tarefas" : "chamados"}
                    </CardChamadoText>
                    <CardChamadoText2  type={messageType}>
                        {getText({ messageType, userType })}
                    </CardChamadoText2>
                </TextContainer>
            </CardChamadoWrapper>
        </CardChamadoContainer>
	);
}