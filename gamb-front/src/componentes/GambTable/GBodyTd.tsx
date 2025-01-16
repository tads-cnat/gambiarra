import React from "react";
import { BodyTd } from "./tableStyles";
import { GambBodyTdProps } from "../../interfaces/componentes/iGambBodyTd";

export function GBodyTd(props : GambBodyTdProps) {
    return(
        <BodyTd>{props.content}</BodyTd>
    )
}
