import { Bolinha, FilterTitleContainer, Linha } from "./TitleStyles";
import { GambTitleProps } from "../../interfaces/componentes/iGambTitle";

export function GambTitle(props: GambTitleProps): React.JSX.Element {
    const { color, label } = props;
    return (
        <FilterTitleContainer>
            <Bolinha color={color} />
           <p> {label}</p>
            <Linha color={color} />
        </FilterTitleContainer>
    );
}