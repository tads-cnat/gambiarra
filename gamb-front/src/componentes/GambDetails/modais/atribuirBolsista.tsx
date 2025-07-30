import { useForm } from "react-hook-form";
import GambButton from "../../GambButton/Button";
import {
	ModalCard,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "../../GambModal/modalstyles";
import axiosInstance from "../../../services/base/axiosInstance";
import { useEffect, useState } from "react";
import { notification } from 'antd';
import { AtribuirBolsistaFormValues } from "../Details";

export default function AtribuirBolsistaModal(props: {
	isModalOpen: boolean;
	closeModal: () => void;
	onSubmit: (values: AtribuirBolsistaFormValues) => void;
}) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<AtribuirBolsistaFormValues>();
	const { isModalOpen, closeModal, onSubmit } = props;
	const [options, setOptions] = useState<{ label: string; value: number }[]>(
		[]
	);

	async function fetchUsers() {
		const grupo_id = 3;
		try {
			const response = await axiosInstance.get("usuario/", {
				params: { grupo_id },
			});
			const option = response.data.map((user: any) => ({
				label: user.username,
				value: user.id,
			}));
			setOptions(option);
		} catch (error) {
			notification.error({
				message: "Erro ao buscar usuários",
				placement: 'top',
			});
		}
	}

	useEffect(() => {
		fetchUsers();
	}, []);

	if (isModalOpen) {
		return (
			<>
				<ModalOverlay onClick={closeModal}>
					<ModalCard
						onClick={(e) => e.stopPropagation()}
						className="elevacao-def"
					>
						<ModalHeader>
							<h3>Atribuir Bolsista ao Chamado</h3>
						</ModalHeader>

						<form
							style={{
								marginTop: "8px",
								maxHeight: "400px",
								overflowY: "auto",
							}}
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col gap-4 p-2 mt-0 justify-center items-start"
						>
							Selecione um ou mais bolsistas para atribuir ao
							chamado:
							<div className="flex flex-col gap-2">
								{options.map((option) => (
									<div
										key={option.value}
										className="flex items-center gap-2"
									>
										<input
											type="checkbox"
											id={`bolsista-${option.value}`}
											value={option.value}
											{...register("bolsistas", {
												required: true,
											})}
											className="w-5 h-5 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-green-500"
										/>
										<label
											htmlFor={`bolsista-${option.value}`}
											className="text-gray-700"
										>
											{option.label}
										</label>
									</div>
								))}
							</div>
							
							{errors.bolsistas && (
								<p style={{ color: "red" }}>
									Este campo é obrigatório
								</p>
							)}{" "}
							{/* Exibe erro se não for preenchido */}
							<ModalFooter>
								<GambButton
									label="Alterar"
									type="submit"
									variant="verde"
									size="large"
								/>
								<GambButton
									label="Cancelar"
									type="button"
									variant="inline"
									size="large"
									onClick={closeModal}
								/>
							</ModalFooter>
						</form>
					</ModalCard>
				</ModalOverlay>
			</>
		);
	}

	return null; // Retorna null quando o modal não está aberto
}
