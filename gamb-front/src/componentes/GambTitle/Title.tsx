import React from "react";
import { GambTitleProps } from "../../interfaces/componentes/iGambTitle";
import { Bolinha, FilterTitleContainer, Linha } from "./TitleStyles";

export function GambTitle(props: GambTitleProps) {
    return (
        <FilterTitleContainer>
            <Bolinha color={props.color} />
            {props.label}
            <Linha color={props.color} />
        </FilterTitleContainer>
    );
}