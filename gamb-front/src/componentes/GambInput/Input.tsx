import React from "react";
import { Controller } from "react-hook-form";
import { InputFieldProps } from "../../interfaces/componentes/iGambInput";

const InputField: React.FC<InputFieldProps> = ({
  name,
  control,
  label,
  type = "text",
  placeholder = "",
  defaultValue = "",
  rules,
  className,
  errorMessage,
  textAux,
}) => (
  <div className={`input-field ${className}`}>
    {label && <label className="block text-gray-700 mb-2" htmlFor={name}>{label}</label>}
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <>        <input
          {...field}
          id={name}
          type={type}
          placeholder={placeholder}
          className="appearance-none block w-full  border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none "
          data-cypress={name + "-input"}
        />
       
        <p className="text-400 text-xs">{textAux}</p>
        </>

      )}
    />
    {errorMessage && <span className="error-message text-400 text-xs">{errorMessage}</span>}
  </div>
);

export default InputField;
