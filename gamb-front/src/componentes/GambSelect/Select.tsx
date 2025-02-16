import { UseFormRegisterReturn } from "react-hook-form";
import { SelectText } from "./SelectStyles";

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  name?: string;
  defaultValue?: string | number | (string | number)[]; // para um valor padrao nulo, passe "" string vazia
  label?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  className?: string;
  error?: string;
  formIsValid?: boolean;
  options: Option[];
  /**
   * Se true, o select permitirá selecionar múltiplas opções.
   * Caso contrário, será um select simples.
   */
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

export function SelectField(props: SelectFieldProps): JSX.Element {
  const {
    name,
    defaultValue,
    label,
    placeholder,
    className,
    register,
    error,
    formIsValid,
    options,
    multiple = false,
  } = props;

  return (
    <div>
      {/* Label do campo */}
      {label && (
        <label className="block text-gray-700 mb-2" htmlFor={name}>
          {label}
        </label>
      )}

      {/* Campo de seleção */}
      <SelectText
        id={`${name}-select`}
        className={className}
        data-cypress={`${name}-select`}
        {...register}
        defaultValue={defaultValue as string | number | readonly string[] | undefined}
        multiple={multiple}
      >
        {/* Se for select simples e houver placeholder, renderiza uma opção desabilitada */}
        {!multiple && placeholder && (
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

      {/* Exibe mensagem de erro, se houver */}
      {error && !formIsValid && (
        <p className="text-red-500 text-xs italic mt-1">{error}</p>
      )}
    </div>
  );
}
