import { InputFieldProps } from "../../interfaces/componentes/iGambInput";
import Icon from "../GambIcon/Icon";
import UseMessage from "../GambMessage/Message";
import { InputText } from "./inputsStyle"; // Importando o styled-component
import React from "react";

export default function InputField(props: InputFieldProps): JSX.Element {
  const {
    name,
    defaultValue,
    label,
    type = "text",
    placeholder,
    className,
    register,
    textAux,
    error,
    icon,
  } = props;

  return (
    <>
      <div >
        {label && (
          <label className="block text-gray-700 mb-2}" htmlFor={name}>
            {label}
          </label>
        )}

        {/* Usando o styled component inputText para envolver o input */}
        <InputText className={className}>
        <Icon icon={icon || "arquivo"} />
        <input
            id={name + "-input"}
            type={type}
            placeholder={placeholder}
            data-cypress={`${name}-input`}
            {...register}
            defaultValue={defaultValue}
          />
        </InputText>

        {/* Texto auxiliar */}
        {textAux && <p className=" text-xs">{textAux}</p>}

        {/* Exibição de mensagem de erro */}
        {error && (
          <UseMessage type="danger" text={error} />
        )}
      </div>
    </>
  );
}
