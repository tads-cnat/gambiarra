import { MessageProps } from "../../interfaces/componentes/iGambMessage";
import { MessageContainer, MessageWrapper, MessageIcon, MessageText, CloseButton } from "./messagestyle";
import Icon from "../GambIcon/Icon";



export default function GambMessage(props: MessageProps): JSX.Element{
    const {
        type,
        text,
        onClose
    } = props
  return (
    <MessageContainer>
        <MessageWrapper type={type}>
            <MessageIcon type={type}>
                {type === "success" && <Icon icon="checkcircle" size={26} />}
                {type === "info" && <Icon icon="info" size={26} />}
                {type === "warning" && <Icon icon="warning" size={26} />}
                {type === "danger" && <Icon icon="danger" size={26} />}
            </MessageIcon>
            <MessageText>{text}</MessageText>
            {onClose && (
                <CloseButton type={type} onClick={onClose}>
                <Icon icon="close" size={24} />
                </CloseButton>
            )}
        </MessageWrapper>
    </MessageContainer>
  );
};


