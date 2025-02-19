import Select from "react-select";
import { Container, customStyles } from "./multSelectStyles";

// Tipagem das opções do Select
interface Option {
  label: string;
  value: number;
}

const options: Option[] = [
  { label: "Em Análise", value: 1 },
  { label: "Aceito", value: 2 },
  { label: "Em Diagnóstico", value: 3 },
  { label: "Equipamento Em Conserto", value: 4 },
  { label: "Aguardando Peça", value: 5 },
  { label: "Fechado Sem Resolução", value: 6 },
  { label: "Resolvido", value: 7 },
  { label: "Recusado", value: 8 },
];

interface MultiSelectProps {
  placeholder: string;
  defaultValue?: string;  // Correção de nome para defaultValue
  label?: string;
  register: any;  // Defina um tipo mais específico para `register` (por exemplo, `UseFormRegister` do React Hook Form)
  error?: any;     // Defina um tipo mais específico para `error`
  formIsValid?: boolean;
  options?: Option[];
  styles?: React.CSSProperties;
}

export default function MultSelect(props: MultiSelectProps): JSX.Element {
  const { placeholder, defaultValue, label, register, error } = props;

  // Handle de seleção refinado
  const handleChange = (selectedOptions: Option[] | null) => {
    if (selectedOptions) {
      const selectedValues = selectedOptions.map((option) => option.value);
      register.onChange(selectedValues);
  }
};

  return (
    <Container>
      {label && (
        <label className="block text-gray-700 mb-2">
          {label}
        </label>
      )}
      <Select
        isMulti
        options={ props.options ? props.options : options }
        onChange={handleChange}
        classNamePrefix="select"
        styles={customStyles}
        defaultValue={defaultValue} // Correção para defaultValue
        placeholder={placeholder}
        {...register}  // Aqui você pode passar o `register` corretamente
      />
      {/* Exibição do erro se houver */}
      {error && <span className="text-red-500">{error.message}</span>}
    </Container>
  );
}
