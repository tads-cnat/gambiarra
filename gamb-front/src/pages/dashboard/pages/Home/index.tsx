import React, { useEffect } from "react";
import CardChamado from "../../../../componentes/GambCardChamados/CardChamado";
import { GambTable } from "../../../../componentes/GambTable/Table";
import ChamadoService from "../../../../services/models/ChamadoService";
import { ChamadoFilter } from "../../../../filters/ChamadoFilter";
import { Chamados } from "../../../../interfaces/models/iChamado";

export default function DashboardHome(): JSX.Element {
	// const chamados = [
	// 	{
	// 		id: 1,
	// 		status: {
	// 			id: 1,
	// 			nome: "Aceito",
	// 		},
	// 		codigo: "8A541DS64",
	// 		titulo: "Computador",
	// 		professor: {
	// 			id: 1,
	// 			nome: "Fernando",
	// 		},
	// 		bolsistas: [{
	// 			id: 1,
	// 			nome: "João",
	// 		}, {
	// 			id: 2,
	// 			nome: "Maria",
	// 		}],
	// 		avaliacao: {
	// 			texto: "Bom",
	// 			nota: 4,
	// 		},
	// 	},
		
	
	// ];

	const [chamados, setChamados] = React.useState<Chamados[]>([]);  // Definindo o tipo Chamado
	async function handleChamados(): Promise<void> {
		// Lógica para buscar chamados
		const filters: ChamadoFilter = {
			limit: 10,
			offset: 0,
		};
		
		await ChamadoService.listarChamados(filters).then((res) => {
			console.log(res);
			setChamados(res.data);

		});

	}
	useEffect(() => {
		handleChamados();
	}, []);
	return (
		<div>
			<div className="flex gap-2">
				<CardChamado
					userType={"professor"}
					messageType={"atribuidas"}
					quantity={0}
				/>
				<CardChamado
					userType={"professor"}
					messageType={"concluidas"}
					quantity={0}
				/>
				<CardChamado
					userType={"professor"}
					messageType={"pendentes"}
					quantity={0}
				/>
				<CardChamado
					userType={"professor"}
					messageType={"recusadas"}
					quantity={0}
				/>
			</div>
			<GambTable
				data={chamados}
				action={true}
				hiddenFields={["id"]}
			/>
		</div>
	);
}
