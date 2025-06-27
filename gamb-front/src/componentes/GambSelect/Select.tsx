import { UseFormRegisterReturn } from "react-hook-form";
import { SelectText } from "./SelectStyles";

const EM_ANALISE = "Em Análise";
const ACEITO = "Aceito";
const EM_DIAGNOSTICO = "Em Diagnóstico";
const EQUIPAMENTO_EM_CONSERTO = "Equipamento Em Conserto";
const AGUARDANDO_PECA = "Aguardando Peça";
const FECHADO_SEM_RESOLUCAO = "Fechado Sem Resolução";
const RESOLVIDO = "Resolvido";
const RECUSADO = "Recusado";

interface Option {
	label: string;
	value: string | number;
}

interface SelectFieldProps {
	defaultValue?: string | number | (string | number)[];
	label?: string;
	placeholder?: string;
	register: UseFormRegisterReturn;
	className?: string;
	error?: string;
	formIsValid?: boolean;
	options?: Option[];
	multiple?: boolean;
	styles?: React.CSSProperties;
	status?: string; // Status atual do chamado
}

// Opções completas
export const statusChamado = [
	{ label: EM_ANALISE, value: 1 },
	{ label: ACEITO, value: 2 },
	{ label: EM_DIAGNOSTICO, value: 3 },
	{ label: EQUIPAMENTO_EM_CONSERTO, value: 4 },
	{ label: AGUARDANDO_PECA, value: 5 },
	{ label: FECHADO_SEM_RESOLUCAO, value: 6 },
	{ label: RESOLVIDO, value: 7 },
	{ label: RECUSADO, value: 8 },
];

const getFilteredOptions = (status?: string): Option[] => {
	if (!status) return statusChamado;

	switch (status) {
		case "1": // Em Análise
			return [
				{ label: ACEITO, value: 2 },
				{ label: RECUSADO, value: 8 },
			];

		case "2": // Aceito
			return [{ label: EM_DIAGNOSTICO, value: 3 }];

		case "3": // Em Diagnostico
			return [
				{ label: EQUIPAMENTO_EM_CONSERTO, value: 4 },
				{ label: AGUARDANDO_PECA, value: 5 },
				{ label: FECHADO_SEM_RESOLUCAO, value: 6 },
			];

		case "4": // Equipamento em conserto
			return [
				{ label: AGUARDANDO_PECA, value: 5 },
				{ label: FECHADO_SEM_RESOLUCAO, value: 6 },
				{ label: RESOLVIDO, value: 7 },
			];

		case "5": // Aguardando peça
			return [
				{ label: EQUIPAMENTO_EM_CONSERTO, value: 4 },
				{ label: FECHADO_SEM_RESOLUCAO, value: 6 },
			];

		case "6": // Fechado sem resolução
			return [];

		case "7": // Resolvido
			return [];

		case "8": // Recusado
			return [];

		default:
			return statusChamado;
	}
};

export function SelectField({
	defaultValue,
	label,
	placeholder,
	className,
	register,
	error,
	formIsValid,
	options,
	multiple = false,
	styles,
	status,
}: SelectFieldProps): React.JSX.Element {
	// Determinar quais opções mostrar
	const filteredOptions = options || getFilteredOptions(status);

	return (
		<div style={styles || { width: "255px" }}>
			{label && (
				<label className="block text-gray-700 mb-2">{label}</label>
			)}

			<SelectText
				className={className}
				defaultValue={
					Array.isArray(defaultValue)
						? defaultValue.map(String)
						: defaultValue?.toString()
				}
				{...register}
				multiple={multiple}
			>
				{placeholder && !multiple && (
					<option
						value=""
						disabled
					>
						{placeholder}
					</option>
				)}
				{filteredOptions.map((option) => (
					<option
						key={option.value}
						value={option.value}
					>
						{option.label}
					</option>
				))}
			</SelectText>

			{error && !formIsValid && (
				<p className="text-red-500 text-xs italic mt-1">{error}</p>
			)}
		</div>
	);
}
