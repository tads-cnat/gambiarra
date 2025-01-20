import React from "react";
import GambButton from "../GambButton/Button";
import {
	CardIndexStyle,
	Tag,
	Info,
	Header,
	ButtonWrapper,
} from "./StyleCardIndex";
import Icon from "../GambIcon/Icon";
import { CardIndexProps } from "../../interfaces/componentes/iGambCardIndex";

export default function CardIndex({
	nomeCampus,
	contato,
	endereco,
	professores,
	bolsistas,
	maquinas,
}: CardIndexProps) {
	return (
		<CardIndexStyle>
			<Header>
				<img
					src="/assets/logoCNAT.png"
					alt="Logo do Campus"
				/>
				<h3>{nomeCampus}</h3>
			</Header>

			<hr />

			<Info>
				<p>
					<Icon icon="envelope" /> <strong>{contato}</strong>
				</p>
				<p>
					<Icon icon="pin" /> {endereco}
				</p>
			</Info>

			<div className="tags">
				<Tag color="#564CCF">
					<p>{professores} professores</p>
				</Tag>
				<Tag color="#564CCF">
					<p>{bolsistas} bolsistas</p>
				</Tag>
				<Tag color="#12A400">
					<p>{maquinas} máquinas restauradas</p>
				</Tag>
			</div>

			<ButtonWrapper>
				<GambButton
					variant="inline"
					label="Saiba mais"
					icon="seta_direita"
				/>
			</ButtonWrapper>
		</CardIndexStyle>
	);
}
