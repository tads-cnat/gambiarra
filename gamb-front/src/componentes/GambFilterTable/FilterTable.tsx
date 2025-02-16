import React from "react";
import { GambFilterTableProps } from "../../interfaces/componentes/iGambFilterTable";
import { FilterTableContainer } from "./FilterTableStyles";

export function GambFilterTable(props: GambFilterTableProps) {
    return (
        <FilterTableContainer className={props.className}>
           {props.children}
        </FilterTableContainer>
    );
}