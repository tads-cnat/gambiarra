import { BodyTd } from "./tableStyles";
import { GambBodyTdProps } from "../../interfaces/componentes/iGambBodyTd";

export function GBodyTd(props: GambBodyTdProps) {
	return <BodyTd>{props.children}</BodyTd>;
}
