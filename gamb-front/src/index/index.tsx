import { Footer } from "../componentes/GambFooter/Footer";
import { Header } from "../componentes/GambHeader/Header";

import GambButton from "../componentes/GambButton/Button";
// import ChamadoService from "../services/models/ChamadoService";
// import { ChamadoSubmit } from "../interfaces/models/iChamado";


export default function Home() {
	


	// const chamados = ChamadoService.listarChamados();
	// const chamado: ChamadoSubmit = {
	// 	titulo: "Exemplo",
	// 	descricao: "descricao bem foda meu parceiro",
	// 	item: {
	// 		modelo: "modelo da lenovo",
	// 		acessorios: [
	// 			{
	// 				nome: "carregador",
	// 			},
	// 		],
	// 	},
	// };
	// function ChamadoSubmit() {
	// 	ChamadoService.criarChamado(chamado).then((response) => {
	// 		console.log(response);

	// 		alert("Chamado criado com sucesso");
	// 		window.location.reload();
	// 	});
	// }

	return (
		<div>
			<Header />
			<h1>Tela inicial</h1>

			<GambButton
				variant="verde"
				label="Criar chamado"
			/>

			<div>
				
			</div>

			<h1>Chamados</h1>

			{/* {{chamados.map(chamado => <div key={chamado.id}>{chamado.titulo}</div>)}} */}

			<Footer />
		</div>
	);
}
