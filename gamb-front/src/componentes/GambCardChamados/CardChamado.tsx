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
import { getUserActiveRole } from "../../auth/service/AuthStore";

function CardChamado({ userType, cardKey, quantity }: CardChamadoProps) {
	const messages = {
		gerente: {
			cadastrados: "Chamados Cadastrados",
			pendentes: "Chamados Pendentes",
			resolvidos: "Chamados Resolvidos",
			fechados: "Sem solução",
		},
		bolsista: {
			atribuidas: "Atribuídas",
			concluidas: "Concluídas",
			pendentes: "Pendentes",
		},
		professor: {
			atribuidas: "Recebidos",
			concluidas: "Concluídos",
			pendentes: "Pendentes",
			recusadas: "Recusados",
		},
		cliente: {
			atribuidas: "Cadastrados",
			concluidas: "Resolvidos",
			pendentes: "Pendentes",
			recusadas: "Recusados",
		},
	};

	const icons = {
		gerente: {
			cadastrados: "usercircleplus",
			pendentes: "usercirclegear",
			resolvidos: "usercirclecheck",
			fechados: "usercircleminus",
		},
		bolsista: {
			atribuidas: "usercircleplus",
			concluidas: "usercirclecheck",
			pendentes: "usercirclegear",
		},
		professor: {
			atribuidas: "usercircleplus",
			concluidas: "usercirclecheck",
			pendentes: "usercirclegear",
			recusadas: "usercircleminus",
		},
		cliente: {
			atribuidas: "usercircleplus",
			concluidas: "usercirclecheck",
			pendentes: "usercirclegear",
			recusadas: "usercircleminus",
		},
	};

	// Corrigindo o erro usando type assertion para que o TS saiba que as chaves são do tipo string
	const message =
		(messages[userType] as Record<string, string>)[cardKey] ||
		"Status desconhecido.";
	const iconName =
		(icons[userType] as Record<string, string>)[cardKey] ||
		"usercirclegear";

	return (
		<CardChamadoContainer>
			<CardChamadoWrapper $cardKey={cardKey}>
				<CardChamadoIcon $cardKey={cardKey}>
					<Icon
						icon={iconName}
						size={75}
					/>
				</CardChamadoIcon>
				<TextContainer>
					<CardChamadoText $cardKey={cardKey}>
						{quantity}{" "}
						{userType === "bolsista" ? "tarefas" : "chamados"}
					</CardChamadoText>
					<CardChamadoText2 $cardKey={cardKey}>
						{message}
					</CardChamadoText2>
				</TextContainer>
			</CardChamadoWrapper>
		</CardChamadoContainer>
	);
}

export default function RenderCards() {
	// fazer a requisição para preencher informações

	return (
		<>
			{getUserActiveRole() === "gerente" ? (
				<>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="cadastrados"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="pendentes"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="resolvidos"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="fechados"
						quantity={0}
					/>
				</>
			) : getUserActiveRole() === "cliente" ? (
				<>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="atribuidas"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="concluidas"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="pendentes"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="recusadas"
						quantity={0}
					/>
				</>
			) : getUserActiveRole() === "professor" ? (
				<>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="atribuidas"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="concluidas"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="pendentes"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="recusadas"
						quantity={0}
					/>
				</>
			) : (
				<>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="atribuidas"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="concluidas"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="pendentes"
						quantity={0}
					/>
				</>
			)}
		</>
	);
}
