import { useForm, useFieldArray } from "react-hook-form";
import { ChamadoSubmit } from "../../../../interfaces/models/iChamado";
import InputField from "../../../GambInput/Input";
import Modal from "../../../GambModal/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import GambButton from "../../../GambButton/Button";
import { MouseEvent } from "react";
import { chamadoSchema } from "./schema";
 

export default function ModalChamadoSubmit(props: {
	isModalOpen: boolean;
	closeModal: () => void;
	onSubmit: (data: ChamadoSubmit) => void;
}) {
	const { isModalOpen, closeModal, onSubmit } = props;

	// Hook para o formulário e campo de array dinâmico
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ChamadoSubmit>({
		resolver: yupResolver(chamadoSchema),
	});

	// useFieldArray para manipulação dos acessórios
	const { fields, append, remove } = useFieldArray({
		control,
		name: "item.acessorios", // O nome do campo que contém o array de acessórios
	});

	// Função para adicionar um novo acessório
	const addAcessorio = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault(); // Previne o envio do formulário caso algum comportamento de submit aconteça
		append({ nome: "" }); // Adiciona um novo item vazio no array de acessórios
	};

	return (
		<>
			<Modal
				isModalOpen={isModalOpen}
				onClose={closeModal}
				title="Abrir Chamado"
				onSubmit={handleSubmit(onSubmit)} // Integração com handleSubmit
			>
				<h3 className="text-xl font-normal mt-3 mb-1">
					| Dados Gerais <span className="text-red-500">*</span>
				</h3>

				<InputField
					label="Título"
					type="text"
					placeholder="Informe um título para o chamado"
					name="titulo"
					error={errors.titulo?.message}
					register={register("titulo")}
				/>

				<InputField
					label="Descrição"
					type="text"
					placeholder="Informe uma descrição para o chamado"
					name="descricao"
					error={errors.descricao?.message}
					register={register("descricao")}
				/>
				<h3 className="text-xl font-normal mt-3 mb-1">
					| Item <span className="text-red-500">*</span>
				</h3>

				<InputField
					label="Modelo"
					type="text"
					placeholder="Informe o item com defeito"
					name="item.modelo"
					error={errors.item?.modelo?.message}
					textAux="Informe o modelo do item com defeito"
					register={register("item.modelo")}
				/>
				{/* Botão para adicionar um acessório */}
				<div className="flex w-full justify-end">
					<GambButton
						label="Adicionar Acessório"
						type="button" // Garantir que o tipo seja 'button' para não submeter o formulário
						variant="inline"
						icon="plus"
						size="small"
						onClick={addAcessorio}
					/>
				</div>

				<h3 className="text-xl font-regular  mt-3 mb-1">
					| Acessórios (Opcional)
				</h3>

				{/* Mapeando os campos de acessórios */}
				{fields && fields.length > 0 ? (
					fields.map((item, index) => (
						<div key={item.id}>
							<InputField
								className="input-acessorio texto-roxo"
								label={`# Acessório 0${index + 1}`}
								type="text"
								placeholder="Informe o nome do acessório"
								name={`item.acessorios.${index}.nome`} // Usando a interpolação correta
								error={
									errors.item?.acessorios?.[index]?.nome
										?.message
								}
								icon="lego"
								register={register(
									`item.acessorios.${index}.nome`
								)}
								textAux="Informe um acessório que pode acompanhar o item defeituoso na sua entrega. EX: Item = Notebook / Acessório 01 =  carregador / Acessório 02 = mouse"
							/>

							{/* Botão para remover o acessório */}
							<div className="flex w-full justify-end">
								<GambButton
									className="mt-2"
									label="Remover Acessório"
									type="button" // Garantir que o tipo seja 'button' para não submeter o formulário
									variant="vermelho"
									size="small"
									icon="trash"
									onClick={() => remove(index)}
								/>
							</div>
						</div>
					))
				) : (
					<p className="text-xs text-gray-500">
						Você ainda não adicionou nenhum acessório
					</p>
				)}
			</Modal>
		</>
	);
}
