import axiosInstance from "../../services/base/axiosInstance";
import { useEffect, useState } from "react";
import Timeline from "./TimeLine";
import type { StatusType } from "../../interfaces/componentes/iGambTimeLine";
import { statusConfig } from "./statusConfig";

export function RequestTimeLine(props: { id: number }): React.JSX.Element {
	const { id } = props;
	const [timeLine, setTimeLine] = useState<StatusType[]>([]);

	async function handleTimeLine(id: number): Promise<void> {
		await axiosInstance
			.get(`/chamado/${id}/alteracoes/`)
			.then((response) => {
				const result = response.data.map((alt: any) => {
					let color = "";
					let label = "";
					console.log("ALT", alt);
					if (alt.status === "1") {
						color = statusConfig["1"].color;
						label = "Em análise";
					} else if (alt.status === "2") {
						color = statusConfig["2"].color;
						label = "Aceito";
					} else if (alt.status === "3") {
						color = statusConfig["3"].color;
						label = "Em Diagnóstico";
					} else if (alt.status === "4") {
						color = statusConfig["4"].color;
						label = "Equipamento Em Conserto";
					} else if (alt.status === "5") {
						color = statusConfig["5"].color;
						label = "Aguardando Peça";
					} else if (alt.status === "6") {
						color = statusConfig["6"].color;
						label = "Fechado Sem Resolução";
					} else if (alt.status === "7") {
						color = statusConfig["7"].color;
						label = "Resolvido";
					} else if (alt.status === "8") {
						color = statusConfig["8"].color;
						label = "Recusado";
					}

					return {
						label: label,
						color: color,
						tooltip: alt.data_alteracao,
					};
				});
				setTimeLine(result);
			})
			.catch((error) => {
				console.error("Erro ao buscar timeline:", error);
			});
	}

	useEffect(() => {
		void handleTimeLine(id);
	}, [id]);

	return <>{timeLine.length > 0 && <Timeline status={timeLine} />}</>;
}
