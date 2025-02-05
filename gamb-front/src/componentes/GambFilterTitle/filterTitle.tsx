import React from "react";
import { GambFilterTitleProps } from "../../interfaces/componentes/iGambFilterTitle";
import { Bolinha, FilterTitleContainer, Linha } from "./filterTitleStyles";

export function GambFilterTitle(props: GambFilterTitleProps) {
    return (
        <FilterTitleContainer>
            <Bolinha />
            {props.label}
            <Linha />
        </FilterTitleContainer>
    );
}