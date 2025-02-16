import { useEffect, useState } from "react";
import { GambTable } from "../../../../componentes/GambTable/Table";
import ChamadoService from "../../../../services/models/ChamadoService";
import { Chamados } from "../../../../interfaces/models/iChamado";
import { useUser } from "../../../../auth/service/user";
import RenderCards from "../../../../componentes/GambCardChamados/CardChamado";
import AceitarChamadoModal from "../../../../componentes/GambTable/forms/AceitarChamadoModal";
import EncerrarChamadoModal from "../../../../componentes/GambTable/forms/EncerrarChamadoModal";

export default function DashboardHome(): JSX.Element {

	const [AceitarModalOpen, setAceitarModalOpen] = useState(false);
	const [EncerrarModalOpen, setEncerrarModalOpen] = useState(false);
	const [chamadoId, setChamadoId] = useState(null);

	const closeAceitarModal = () => setAceitarModalOpen(false);
	const closeEncerrarModal = () => setEncerrarModalOpen(false);

	const [chamados, setChamados] = useState<Chamados[]>([]);

	async function handleChamados(): Promise<void> {
		const res = await ChamadoService.listarChamados();
		setChamados((res as { data: Chamados[] }).data);
	}

	const { userActiveRole } = useUser();

	useEffect(() => {
		handleChamados();
	}, []);

	if (!userActiveRole) {
		return <p>Carregando...</p>;
	}

	return (
		<>
		
			<div>
				<div className="flex flex-wrap gap-2">
					<RenderCards />
				</div>
				<GambTable
					data={chamados}
					action={true}
					hiddenFields={["id"]}
					isChamados={true}
					TableActions={
						{
							detalhar: (id: number) => console.log("detalhar", id),
							chat: (id: number) => console.log("chat", id),
							arquivar: (id: number) => console.log("arquivar", id),
							resolver: (id:number) => console.log(id),
							aceitar: (id:number) =>{ setChamadoId(id)
													setAceitarModalOpen(true)
												},
							recusar: (id:number) =>{
													setChamadoId(id)
													setEncerrarModalOpen(true)
												}
						}
					}
				/>
			</div>
			<AceitarChamadoModal
				isModalOpen={AceitarModalOpen}
				closeModal={closeAceitarModal}
				chamadoId={chamadoId}
			/>
			<EncerrarChamadoModal
				isModalOpen={EncerrarModalOpen}
				closeModal={closeEncerrarModal}
				chamadoId={chamadoId}
			/>
		</>
	);
}
