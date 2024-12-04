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
	} = props;
	// regras de negócio relacionadas ao componente devem ser implementadas aqui
	return (
		<>
			<button
				onClick={onClick}
				type={type}
				disabled={disabled}
				className={`${className} size-${size}`} // Concatena className com o tamanho
				style={style}
				data-cypress={dataCypress}
			>
				<ButtonGeneric variant={variant}>
					{label}
					{icon && (
						<Icon
							icon={icon}
							size={
								size === "small"
									? 14
									: size === "medium"
									? 16
									: size === "large"
									? 24
									: size
							}
						/>
					)}
				</ButtonGeneric>
			</button>
		</>
	);
}
