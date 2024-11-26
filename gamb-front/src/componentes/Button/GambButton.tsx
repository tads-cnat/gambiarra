import { GambButtonProps } from "../../interfaces/iGambButton";
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
	} = props;
	// regras de negócio relacionadas ao componente devem ser implementadas aqui

	return (
		<>
			<button
				onClick={onClick}
				type={type}
				disabled={disabled}
				className={className}
				style={style}
				data-cypress={dataCypress}
			>
				<ButtonGeneric variant={variant}>
					<i>{/* // nome do icone, chamar componente de botão */}</i>
					{label}
				</ButtonGeneric>
			</button>
		</>
	);
}
