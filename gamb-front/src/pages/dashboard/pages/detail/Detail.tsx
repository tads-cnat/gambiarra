import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatCard } from "./detailstyles";
import ChamadoDetalhes from "../../../../componentes/GambDetails/Details";
import Chat from "../../../../componentes/GambChat/Chat";
import Icon from "../../../../componentes/GambIcon/Icon";
import ChamadoService from "../../../../services/models/ChamadoService";
import { Chamado } from "../../../../interfaces/componentes/iGambDetails";
import { RequestTimeLine } from "../../../../componentes/GambTimeLine/TimeLineReceive";


export default function Detail(): React.JSX.Element {
	const { id } = useParams();
	const [chamado, setChamado] = useState<Chamado | null>(null);
	const navigate = useNavigate();

	async function fetchChamado() {
		if (id) {
			await ChamadoService.getChamadoID(Number(id))
				.then(async (response: any) => {
					const chamado = response;
					await ChamadoService.getAcessorio(Number(chamado.item.id))
						.then((response: any) => {
							const acessorio = response;
							chamado.acessorio = acessorio;
						})
						.catch((error) => {
							console.error("Erro ao buscar acessorio:", error);
						});
					setChamado(chamado);
					console.log("Chamado:", chamado);
				})
				.catch((error) => {
					if (error.response?.status === 404) {
						alert(
							"Chamado não encontrado. Tente novamente ou verifique as informações."
						);
						navigate("/dashboard");
					}
				});
		}
	}

	useEffect(() => {
		fetchChamado();
	}, [id]);

	
	return (
		<div className="flex flex-col gap-4">
			{chamado ? (
				<ChamadoDetalhes chamado={chamado} />
			) : (
				<p>Carregando chamado...</p>
			)}
			<ChatCard>
				<div className="inline-flex flex-row items-center gap-4">
					<Icon
						icon="clock"
						size={40}
						color="#564CCF"
					/>
					<h3 className="bg-gray-200 rounded-md px-2 py-1">
						Linha do Tempo
					</h3>
				</div>
				<div className="flex flex-col gap-8">
					<RequestTimeLine id={Number(id)} />

					<div className="inline-flex flex-row items-center gap-4">
						<Icon
							icon="chatfill"
							size={40}
							color="#28a745"
						/>
						<h3 className="bg-gray-200 rounded-md px-2 py-1">
							Chat do Chamado
						</h3>
					</div>

					<Chat chamado_id={Number(id) ? Number(id) : 4} />
				</div>
			</ChatCard>
		</div>
	);
}
