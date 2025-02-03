import React from "react";
import CardChamado from "../../../../componentes/GambCardChamados/CardChamado";

export default function DashboardHome(): JSX.Element {
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
		</div>
	);
}
