import { UseFormRegisterReturn } from "react-hook-form";
import { SelectText } from "./SelectStyles";

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
  { label: "Em Análise", value: 1 },
  { label: "Aceito", value: 2 },
  { label: "Em Diagnóstico", value: 3 },
  { label: "Equipamento Em Conserto", value: 4 },
  { label: "Aguardando Peça", value: 5 },
  { label: "Fechado Sem Resolução", value: 6 },
  { label: "Resolvido", value: 7 },
  { label: "Recusado", value: 8 },
];

const getFilteredOptions = (status?: string): Option[] => {
  if (!status) return statusChamado;
  
  switch(status) {
    case "1": // Em Análise
      return [
        { label: "Aceito", value: 2 },
        { label: "Recusado", value: 8 }
      ];
      
    case "2": // Aceito
      return [
        { label: "Em Diagnóstico", value: 3 },
      ];

    case "3": // Em Diagnostico
      return [
        { label: "Equipamento Em Conserto", value: 4 },
        { label: "Aguardando Peça", value: 5 },
        { label: "Fechado Sem Resolução", value: 6 },
      ];

    case "4": // Equipamento em conserto
      return [
        { label: "Aguardando Peça", value: 5 },
        { label: "Fechado Sem Resolução", value: 6 },
        { label: "Resolvido", value: 7 },
      ];

    case "5": // Aguardando peça
      return [
        { label: "Equipamento Em Conserto", value: 4 },
        { label: "Fechado Sem Resolução", value: 6 },
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
}: SelectFieldProps): JSX.Element {

  // Determinar quais opções mostrar
  const filteredOptions = options || getFilteredOptions(status);

  return (
    <div style={styles || { width: "255px" }}>
      {label && (
        <label className="block text-gray-700 mb-2">
          {label}
        </label>
      )}

      <SelectText
        className={className}
        defaultValue={Array.isArray(defaultValue) ? defaultValue.map(String) : defaultValue?.toString()}
        {...register}
        multiple={multiple}
      >
        {placeholder && !multiple && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {filteredOptions.map((option) => (
          <option key={option.value} value={option.value}>
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