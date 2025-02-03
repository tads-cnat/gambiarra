import React from "react";
import {
  CircleContainer,
  IconContainer,
  Badge,
} from "./notificacaostyle";
import { NotificacaoProps } from "../../interfaces/componentes/iGambNotificacao";
import Icon from "../GambIcon/Icon";

export default function Notificacao({
  icon,
  backgroundColor,
  badgeNumber = 0,
  size = 50, // Tamanho padrão do círculo principal
}: NotificacaoProps) {
  return (
    <CircleContainer size={size} backgroundColor={backgroundColor}>
      <IconContainer>
        <Icon icon={icon} size={size / 2} />
      </IconContainer>
      <Badge>{badgeNumber}</Badge>
    </CircleContainer>
  );
}
