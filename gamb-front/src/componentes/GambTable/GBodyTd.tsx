import { BodyTd } from "./tableStyles";
import { GambBodyTdProps } from "../../interfaces/componentes/iGambBodyTd";

export function GBodyTd(props: GambBodyTdProps) {
	let style = {};
	if(props.header === "status") {

		style = { minWidth: "250px", maxWidth: "250px" };
	}
	console.log("props.header", props.header);
	if(props.header === "acoes") {

		style = { minWidth: "150px", maxWidth: "150px" };
	}
	return <BodyTd style={style} >{props.children}</BodyTd>;
}
