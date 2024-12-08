import { GambButtonProps }from '../../interfaces/iGambButton';
import { ButtonGeneric } from './buttonstyle';

export default function GambButton( props: GambButtonProps): JSX.Element {

    const {variant, onClick, type, disabled, className, style, label } = props;
    // regras de negócio relacionadas ao componente devem ser implementadas aqui

    return(
    <>
    <button 
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={className}
        style={style}

        >
        <ButtonGeneric variant={variant} >
            <i>
            {/* // nome do icone, chamar componente de botão */}
            </i>
            {label}</ButtonGeneric>
    </button>

    </>
    )
}

// exemplos

//   {/* teste botões */}
//   <ButtonGeneric variant="amarelo">Gambi</ButtonGeneric>
//   <ButtonGeneric variant="branco">Gambi</ButtonGeneric>
//   <ButtonGeneric variant="roxo">Gambi</ButtonGeneric>
//   <ButtonGeneric variant="verde">Gambi</ButtonGeneric>