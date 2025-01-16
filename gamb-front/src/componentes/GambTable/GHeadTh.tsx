import React from "react";
import { GambHeadThProps } from "../../interfaces/componentes/iGambHeadTh";
import { HeadTh } from "./tableStyles";

export function GHeadTh(props : GambHeadThProps) {
    return(
        <HeadTh>{props.title}</HeadTh>
    )
}
