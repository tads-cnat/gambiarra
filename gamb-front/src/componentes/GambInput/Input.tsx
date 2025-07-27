import { Input } from "antd";
import { InputFieldProps } from "../../interfaces/componentes/iGambInput";
import GambButton from "../GambButton/Button";
import Icon from "../GambIcon/Icon";
import UseMessage from "../GambMessage/Message";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { defaultTheme } from "../../styles/themes/default";
const theme = defaultTheme;

export default function InputField(props: InputFieldProps): React.JSX.Element {
  const {
    name,
    control, 
    defaultValue,
    label,
    type = "text",
    placeholder,
    className,
    textAux,
    error,
    icon,
    formIsValid,
    classNameFather,
  } = props;

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const typeInputPassword = isPasswordVisible ? "text" : "password";
  const iconPassword = isPasswordVisible ? "eyeopen" : "eyeclose";

  const status = error
    ? "error"
    : formIsValid === true
    ? "success"
    : undefined;

  return (
    <div className={classNameFather}>
      {label && (
        <label className="block text-gray-700 mb-2" htmlFor={name}>
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            {...field}
            id={`${name}-input`}
            type={type === "password" ? typeInputPassword : type}
            placeholder={placeholder}
            data-cypress={`${name}-input`}
            className={className}
            prefix={<Icon color={theme.cores.gray_100} icon={icon || "arquivo"} />}
            suffix={
              type === "password" && (
                <GambButton
                  type="button"
                  variant="circle"
                  className="p-0"
                  size="mediumlg"
                  icon={iconPassword}
                  onClick={() =>
                    setPasswordVisibility(!isPasswordVisible)
                  }
                />
              )
            }
            style={{
              borderColor: status === "error" ? "red" : status === "success" ? "green" : undefined, minHeight: "40px", maxHeight: "40px",
            }}
          />
        )}
      />

      {textAux && <p className="text-xs text-gray-500">{textAux}</p>}
      {error && <UseMessage type="danger" text={error} />}
    </div>
  );
}
