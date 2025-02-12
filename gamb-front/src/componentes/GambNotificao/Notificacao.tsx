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
  badgeNumber = -1,
  size = 50, // Tamanho padrão do círculo principal
  iconColor,
  onClick,
}: NotificacaoProps) {
  return (
    <CircleContainer size={size} backgroundColor={backgroundColor} onClick={onClick}>
      <IconContainer iconColor={iconColor}>
        <Icon icon={icon} size={size / 2} />
      </IconContainer>
      {badgeNumber >= 0 && <Badge>{badgeNumber}</Badge>}
    </CircleContainer>
  );
}
