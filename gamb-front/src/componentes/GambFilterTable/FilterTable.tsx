import React from "react";
import { FilterTableContainer } from "./FilterTableStyles";

interface GambFilterTableProps {
    children: React.ReactNode;
    className?: string;
}


export function GambFilterTable(props: GambFilterTableProps) {
    return (
        <FilterTableContainer className={props.className}>
           {props.children}
        </FilterTableContainer>
    );
}