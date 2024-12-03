import { useState } from "react";
import { MessageProps } from "../../interfaces/componentes/iGambMessage";
import Icon from "../GambIcon/Icon";
import {
    CloseButton,
    MessageContainer,
    MessageIcon,
    MessageText,
    MessageWrapper,
} from "./messagestyle";

export default function GambMessage(props: MessageProps): JSX.Element {
	const { type, text } = props;
	const [show, setShow] = useState(true);
	function onClose() {
		setShow(!show);
	}

	if (!show) {
		return <></>;
	} else {
		return (
			<MessageContainer>
				<MessageWrapper type={type}>
					<MessageIcon type={type}>
						{type === "success" && (
							<Icon
								icon="checkcircle"
								size={26}
							/>
						)}
						{type === "info" && (
							<Icon
								icon="info"
								size={26}
							/>
						)}
						{type === "warning" && (
							<Icon
								icon="warning"
								size={26}
							/>
						)}
						{type === "danger" && (
							<Icon
								icon="danger"
								size={26}
							/>
						)}
					</MessageIcon>
					<MessageText>{text}</MessageText>
					<CloseButton
						type={type}
						onClick={onClose}
					>
						<Icon
							icon="close"
							size={24}
						/>
					</CloseButton>
				</MessageWrapper>
			</MessageContainer>
		);
	}
}
