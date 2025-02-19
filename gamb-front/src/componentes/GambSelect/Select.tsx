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
  options: Option[];
  multiple?: boolean;
}

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
}: SelectFieldProps): JSX.Element {
  
  

  return (
    <div style={{ width: "255px" }}>
      {label && (
        <label className="block text-gray-700 mb-2" >
          {label}
        </label>
      )}

      <SelectText
        id={`${name}-select`}
        className={className}
        data-cypress={`${name}-select`}
        defaultValue={defaultValue as string | number | readonly string[] | undefined}
        {...register}
        multiple={multiple}
      >
        {placeholder && !multiple && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectText>

      {error && !formIsValid && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
}
