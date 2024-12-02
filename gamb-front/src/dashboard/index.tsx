import { useState } from "react";
import GambButton from "../componentes/GambButton/Button";
import { Footer } from "../componentes/GambFooter/Footer";
import { Header } from "../componentes/GambHeader/Header";
import { Modal } from "../componentes/GambModal/modal";
import { ModalFooter, ModalHeader } from "../componentes/GambModal/modalstyles";
import { defaultTheme } from "../styles/themes/default";

export function Dashboard() {
	const style = defaultTheme;

	const [isModalOpen, setModalOpen] = useState(false);

	const closeModal = () => setModalOpen(false);

	return (
		<div>
			<Header />

			<div>
				<Modal
					isOpen={isModalOpen}
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
			<h1>Dashboard</h1>

			{/* teste botões */}
			<GambButton
				label="Botão Verde"
				variant="verde"
			/>
			<GambButton
				label="Botão Amarelo"
				variant="amarelo"
			/>
			<GambButton
				label="Botão Vermelho"
				variant="vermelho"
			/>
			<GambButton
				label="Botão Roxo"
				variant="roxo"
				icon="house"
				size="medium"
			/>
			<div className={style.teste}>
				<p>
					Exemplo de como passar classes do tailwind através do styled
					componentes
				</p>
			</div>

			<Footer />
		</div>
	);
}
