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
}) => (
  <div className={`input-field ${className}`}>
    {label && <label htmlFor={name}>{label}</label>}
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <input
          {...field}
          id={name}
          type={type}
          placeholder={placeholder}
          className="form-input"
        />
      )}
    />
    {errorMessage && <span className="error-text">{errorMessage}</span>}
  </div>
);

export default InputField;
