import { MessageProps } from "../../interfaces/componentes/iGambMessage";
import Icon from "../GambIcon/Icon";
import {
	CloseButton,
	MessageContainer,
	MessageIcon,
	MessageText,
	MessageWrapper,
} from "./messagestyle";
import { useState } from "react";

export default function UseMessage(props: MessageProps): React.JSX.Element {
	const { type, text, viewClose } = props;
	const [show, setShow] = useState(true);

	// Função para fechar a mensagem
	function onClose(): void {
		setShow(false); // Muda o estado para false, fechando a mensagem
	}
	// Renderiza a mensagem apenas se `show` for true
	if (!show) {
		return <></>; // Se a mensagem não deve ser exibida, retorna vazio
	} else {
		return (
			<MessageContainer>
				<MessageWrapper $type={type}>
					<MessageIcon $type={type}>
						{type === "success" && (
							<Icon
								icon="checkcircle"
								size={24}
							/>
						)}
						{type === "info" && (
							<Icon
								icon="info"
								size={24}
							/>
						)}
						{type === "warning" && (
							<Icon
								icon="warning"
								size={24}
							/>
						)}
						{type === "danger" && (
							<Icon
								icon="danger"
								size={24}
							/>
						)}
					</MessageIcon>
					<MessageText $type={type}>{text}</MessageText>
					{viewClose && (
						<CloseButton
							$type={type}
							onClick={onClose}
						>
							<Icon
								icon="close"
								size={24}
							/>
						</CloseButton>
					)}
				</MessageWrapper>
			</MessageContainer>
		);
	}
}
