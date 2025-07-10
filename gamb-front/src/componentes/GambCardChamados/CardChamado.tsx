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
import { isUserBolsista, isUserExternal, isUserGerente, isUserProfessor } from "../../utils/checkRoleUser";
import { useMemo, useState } from "react";
import ChamadoService from "../../services/models/ChamadoService";
import { ChamadoCardsResponse } from "../../interfaces/models/iChamado";

function CardChamado({ userType, cardKey, quantity }: CardChamadoProps) {
	const messages = {
		gerente: {
			cadastrados: "Chamados Cadastrados",
			pendentes: "Chamados Pendentes",
			resolvidos: "Chamados Resolvidos",
			fechados: "Sem solução",
		},
		bolsista: {
			atribuidos: "Atribuídos",
			concluidos: "Concluídos",
			pendentes: "Pendentes",
		},
		professor: {
			atribuidos: "Recebidos",
			concluidos: "Concluídos",
			pendentes: "Pendentes",
			recusados: "Recusados",
		},
		cliente: {
			solicitados: "Solicitados",
			concluidos: "Resolvidos",
			pendentes: "Pendentes",
			recusados: "Recusados",
		},
		aluno: {
			solicitados: "Solicitados",
			concluidos: "Resolvidos",
			pendentes: "Pendentes",
			recusados: "Recusados",
		},
		servidor: {
			solicitados: "Solicitados",
			concluidos: "Resolvidos",
			pendentes: "Pendentes",
			recusados: "Recusados",
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
			atribuidos: "usercircleplus",
			concluidos: "usercirclecheck",
			pendentes: "usercirclegear",
		},
		professor: {
			atribuidos: "usercircleplus",
			concluidos: "usercirclecheck",
			pendentes: "usercirclegear",
			recusados: "usercircleminus",
		},
		cliente: {
			solicitados: "usercircleplus",
			concluidos: "usercirclecheck",
			pendentes: "usercirclegear",
			recusados: "usercircleminus",
		},
		aluno: {
			solicitados: "usercircleplus",
			concluidos: "usercirclecheck",
			pendentes: "usercirclegear",
			recusados: "usercircleminus",
		},
		servidor: {
			solicitados: "usercircleplus",
			concluidos: "usercirclecheck",
			pendentes: "usercirclegear",
			recusados: "usercircleminus",
		},
	};
	
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
						{isUserBolsista() ? "tarefas" : "chamados"}
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
	const [ cardsChamados, setChamados ] = useState<ChamadoCardsResponse>({});

	async function handleChamadoCartoes(): Promise<void> {
		await ChamadoService.getChamadoCards()
			.then((response) => {
				setChamados(response);
				console.log("Chamados:", response);
			})
				
	
	}

	useMemo(() => {
		if (!getUserActiveRole()) {
			return <p>Carregando...</p>;
		}else {
			handleChamadoCartoes();
		}

	}, []);
	return (
		<>

			{  }
			{isUserGerente() ? (
				<>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="cadastrados"
						quantity={cardsChamados.gerente?.cadastrados || 0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="pendentes"
						quantity={cardsChamados.gerente?.pendentes || 0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="resolvidos"
						quantity={cardsChamados.gerente?.resolvidos || 0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="fechados"
						quantity={cardsChamados.gerente?.fechados || 0}
					/>
				
				</>
			) : isUserExternal() ? (
				<>
				
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="solicitados"
						quantity={cardsChamados?.clientes?.solicitados || 0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="concluidos"
						quantity={cardsChamados?.clientes?.concluidos || 0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="pendentes"
						quantity={cardsChamados?.clientes?.pendentes || 0}
					/>
					
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="recusados"
						quantity={cardsChamados?.clientes?.recusados || 0}
					/>
				</>
			) : isUserProfessor() ? (
				<>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="atribuidos"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="concluidos"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="pendentes"
						quantity={0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="recusados"
						quantity={0}
					/>
				</>
			) : (
				<>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="atribuidos"
						quantity={cardsChamados?.bolsista?.atribuidos || 0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="concluidos"
						quantity={cardsChamados?.bolsista?.concluidos || 0}
					/>
					<CardChamado
						userType={getUserActiveRole()}
						cardKey="pendentes"
						quantity={cardsChamados?.bolsista?.pendentes || 0}
					/>
				</>
			)}
		</>
	);
}
