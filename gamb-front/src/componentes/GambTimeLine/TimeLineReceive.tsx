import axiosInstance from "../../services/base/axiosInstance";
import { useEffect, useState } from "react";
import Timeline from "./TimeLine";
import type { StatusType } from "../../interfaces/componentes/iGambTimeLine";
import { statusConfig } from "./statusConfig";
import { formatDate } from "../../utils/FormatDate";



export function RequestTimeLine(props: { id: number }): React.JSX.Element {
	const { id } = props;
	const [timeLine, setTimeLine] = useState<StatusType[]>([]);

	async function handleTimeLine(id: number): Promise<void> {
		await axiosInstance
			.get(`/chamado/${id}/alteracoes/`)
			.then((response) => {
				const result = response.data.map((alt: any) => {
					let color = "";
					let lineColor = "";
					let label = "";
					let iconName = "";
					const date = new Date(alt.data_alteracao);
  					const tooltip = formatDate(date, "dd/MM/yyyy HH:mm");
					if (alt.status === "1") {
						color = statusConfig["1"].color;
						lineColor = statusConfig["1"].lineColor;
						label = "Em análise";
						iconName = "info";
					} else if (alt.status === "2") {
						color = statusConfig["2"].color;
						lineColor = statusConfig["2"].lineColor;
						label = "Aceito";
						iconName = "checkcircle";
					} else if (alt.status === "3") {
						color = statusConfig["3"].color;
						lineColor = statusConfig["3"].lineColor;
						label = "Em Diagnóstico";
						iconName = "diagnostico";
					} else if (alt.status === "4") {
						color = statusConfig["4"].color;
						lineColor = statusConfig["4"].lineColor;
						label = "Equipamento Em Conserto";
						iconName = "conserto";
					} else if (alt.status === "5") {
						color = statusConfig["5"].color;
						lineColor = statusConfig["5"].lineColor;
						label = "Aguardando Peça";
						iconName = "waiting";
					} else if (alt.status === "6") {
						color = statusConfig["6"].color;
						lineColor = statusConfig["6"].lineColor;
						label = "Fechado Sem Resolução";
						iconName = "sad";
					} else if (alt.status === "7") {
						color = statusConfig["7"].color;
						lineColor = statusConfig["7"].lineColor;
						label = "Resolvido";
						iconName = "happy";
					} else if (alt.status === "8") {
						color = statusConfig["8"].color;
						lineColor = statusConfig["8"].lineColor;
						label = "Recusado";
						iconName = "xcircle";
					} else if (alt.status === "9") {
						color = statusConfig["9"].color;
						lineColor = statusConfig["9"].lineColor;
						label = "Arquivado";
						iconName = "archive";
					}

					return {
						label: label,
						color: color,
						lineColor: lineColor,
						iconName: iconName,
						tooltip: tooltip,
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
