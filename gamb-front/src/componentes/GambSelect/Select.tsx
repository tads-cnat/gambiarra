import React from "react";
import {Controller, Control } from "react-hook-form";
import { Select } from "antd";


const EM_ANALISE = "Em Análise";
const ACEITO = "Aceito";
const EM_DIAGNOSTICO = "Em Diagnóstico";
const EQUIPAMENTO_EM_CONSERTO = "Equipamento Em Conserto";
const AGUARDANDO_PECA = "Aguardando Peça";
const FECHADO_SEM_RESOLUCAO = "Fechado Sem Resolução";
const RESOLVIDO = "Resolvido";
const RECUSADO = "Recusado";

interface OptionType {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  name: string;
  control: Control<any>;
  defaultValue?: string | number;
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  formIsValid?: boolean;
  options?: OptionType[];
  multiple?: boolean;
  styles?: React.CSSProperties;
  status?: string; // Status atual do chamado
}

export const statusChamado: OptionType[] = [
  { label: EM_ANALISE, value: "1" },
  { label: ACEITO, value: "2" },
  { label: EM_DIAGNOSTICO, value: "3" },
  { label: EQUIPAMENTO_EM_CONSERTO, value: "4" },
  { label: AGUARDANDO_PECA, value: "5" },
  { label: FECHADO_SEM_RESOLUCAO, value: "6" },
  { label: RESOLVIDO, value: "7" },
  { label: RECUSADO, value: "8" },
];

const getFilteredOptions = (status?: string): OptionType[] => {
  if (!status) return statusChamado;

  switch (status) {
    case "1":
      return [
        { label: ACEITO, value: "2" },
        { label: RECUSADO, value: "8" },
      ];
    case "2":
      return [{ label: EM_DIAGNOSTICO, value: "3" }];
    case "3":
      return [
        { label: EQUIPAMENTO_EM_CONSERTO, value: "4" },
        { label: AGUARDANDO_PECA, value: "5" },
        { label: FECHADO_SEM_RESOLUCAO, value: "6" },
      ];
    case "4":
      return [
        { label: AGUARDANDO_PECA, value: "5" },
        { label: FECHADO_SEM_RESOLUCAO, value: "6" },
        { label: RESOLVIDO, value: "7" },
      ];
    case "5":
      return [
        { label: EQUIPAMENTO_EM_CONSERTO, value: "4" },
        { label: FECHADO_SEM_RESOLUCAO, value: "6" },
      ];
    case "6":
    case "7":
    case "8":
      return [];
    default:
      return statusChamado;
  }
};

export function SelectField({
  name,
  control,
  defaultValue,
  label,
  placeholder,
  className,
  error,
  formIsValid,
  options,
  multiple = false,
  styles,
  status,
}: SelectFieldProps): React.JSX.Element {
  const filteredOptions = options || getFilteredOptions(status);

  return (
    <div style={styles || { width: "255px" }}>
      {label && <label className="block text-gray-700 mb-2">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            {...field}
            mode={multiple ? "multiple" : undefined}
            showSearch
            placeholder={placeholder || "Selecione"}
            className={className}
            optionFilterProp="label"
			style={{ width: "100%", minHeight: "40px", maxHeight: "40px" }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={filteredOptions.map((opt) => ({
              label: opt.label,
              value: opt.value,
            }))}
          />
        )}
      />

      {error && !formIsValid && (
        <p className="text-red-500 text-xs italic mt-1">{error}</p>
      )}
    </div>
  );
}
