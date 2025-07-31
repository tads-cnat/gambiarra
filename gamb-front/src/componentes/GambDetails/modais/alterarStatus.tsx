import { useForm } from "react-hook-form";
import GambButton from "../../GambButton/Button";
import {
	ModalCard,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "../../GambModal/modalstyles";
import { SelectField } from "../../GambSelect/Select"; // Importe o statusChamado
import { AlterarStatusFormValues } from "../Details";


export default function AlterarStatusModal(props: {
	chamadoId: number | null;
	isModalOpen: boolean;
	closeModal: () => void;
	stats?: string; // Status atual como string
  onSubmit: (values: AlterarStatusFormValues) => void;
}) {
	const {
		formState: { errors },
		handleSubmit,
		control,
	} = useForm<AlterarStatusFormValues>();
	const { isModalOpen, closeModal, stats, onSubmit } = props;


	if (isModalOpen) {
		return (
			<>
				
				<ModalOverlay onClick={closeModal}>
					<ModalCard
						onClick={(e) => e.stopPropagation()}
						className="elevacao-def"
					>
						<ModalHeader>
							<h3>Alterar Status</h3>
						</ModalHeader>

						<form
							style={{ marginTop: "8px" }}
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col gap-4 p-2 mt-0 justify-center items-center"
						>
							<SelectField
								label="Status"
								name="status"
								placeholder="Selecione um status"
								control={control}
								defaultValue=""
								styles={{ width: "100%" }}
								status={stats} // Passando a string do status atual
							/>
							{errors.status && (
								<p style={{ color: "red" }}>
									Este campo é obrigatório
								</p>
							)}

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

	return null;
}
