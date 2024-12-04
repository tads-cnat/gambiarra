import { Sidebar } from "../componentes/Sidebar/Sidebar";
import { DashboardContainer, DashboardContent } from "./dashboardstyles";

export function Dashboard() {

	return (
		<div>
			<DashboardContainer>
				<Sidebar />
				{/* teste botões */}
				<DashboardContent/>
			</DashboardContainer>
		</div>
	);
}
