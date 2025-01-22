import React from "react";
import { Sidebar } from "../componentes/Sidebar/Sidebar";
import CardChamado from "../componentes/GambCardChamados/CardChamado";
import CabecalhoDash from "../componentes/GambCabecalhoDash/CabecalhoDash";
import {
	DashboardContainer,
	DashboardContent,
	DashboardMain,
} from "./dashboardstyles";

export function Dashboard() {
	return (
		<div>
			<DashboardContainer>
				<Sidebar />
				{/* teste botões */}
				<DashboardMain>
					<DashboardContent className="elevacao-def">
						<CabecalhoDash/>
						<div className="flex gap-2">
						<CardChamado userType={"professor"} messageType={"atribuidas"} quantity={0}/>
						<CardChamado userType={"professor"} messageType={"concluidas"} quantity={0}/>
						<CardChamado userType={"professor"} messageType={"pendentes"} quantity={0}/>
						<CardChamado userType={"professor"} messageType={"recusadas"} quantity={0}/>
						</div>
					</DashboardContent>
				</DashboardMain>
			</DashboardContainer>
		</div>
	);
}
