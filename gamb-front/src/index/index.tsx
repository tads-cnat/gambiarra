import { Footer } from "../componentes/GambFooter/Footer";
import { Header } from "../componentes/GambHeader/Header";

import GambButton from "../componentes/GambButton/Button";
// import ChamadoService from "../services/models/ChamadoService";
// import { ChamadoSubmit } from "../interfaces/models/iChamado";
import { Modal } from "../componentes/GambModal/modal";
import { useState } from "react";
import { ModalFooter, ModalHeader } from "../componentes/GambModal/modalstyles";

export default function Home() {
	
	const [ModalOpen, setModalOpen] = useState(false);

	const closeModal = () => setModalOpen(false);

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
				onClick={() => setModalOpen(true)}
			/>

			<div>
				<Modal
					isOpen={ModalOpen}
					onClose={closeModal}
				>
					{/* content aqui */}
					<form>
						<ModalHeader>
							<h2>Abrir Chamado</h2>
						</ModalHeader>

						<h3>| Dados Gerais *</h3>

						<label>Titulo</label>
						<input
							type="text"
							placeholder="informe um titulo para o chamado"
						/>

						<label>Descrição</label>
						<input
							type="text"
							placeholder="informe uma descrição para o chamado"
						/>

						<h3>| Item *</h3>

						<label>Modelo</label>
						<input
							type="text"
							placeholder="informe o modelo do item"
						/>

						<ModalFooter>
							<GambButton
								label="Cancelar"
								variant="cinza"
								onClick={closeModal}
							/>

							<GambButton
								label="Enviar"
								variant="verde"
								type="submit"
								icon="seta_direita"
							/>
						</ModalFooter>
					</form>
				</Modal>
			</div>

			<h1>Chamados</h1>

			{/* {{chamados.map(chamado => <div key={chamado.id}>{chamado.titulo}</div>)}} */}

			<Footer />
		</div>
	);
}
