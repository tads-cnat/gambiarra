import { GambButtonProps } from "../../interfaces/componentes/iGambButton";
import Icon from "../GambIcon/Icon";
import { ButtonGeneric } from "./buttonstyle";

export default function GambButton(props: GambButtonProps): JSX.Element {
	const {
		variant,
		onClick,
		type,
		disabled,
		className,
		style,
		label,
		dataCypress,
		icon,
		size,
		id,
	} = props;
	// regras de negócio relacionadas ao componente devem ser implementadas aqui
	return (
		<>
			<ButtonGeneric
				$variant={variant}
				$size={size || "medium"}
				id={id}
				$disabled={disabled}
				onClick={onClick}
				type={type}
				className={`${className} size-${size} `} // Concatena className com o tamanho
				style={style}
				data-cypress={dataCypress}
			>
				{label}
				{icon && (
					<Icon
						icon={icon}
						size={
							size === "small"
								? 12
								: size === "medium"
								? 14
								: size === "mediumlg"
								? 18
								: size === "large"
								? 24
								: size
						}
					/>
				)}
			</ButtonGeneric>
		</>
	);
}
