import { HeadTh } from "./tableStyles";
import { GambHeadThProps } from "../../interfaces/componentes/iGambHeadTh";

export function GHeadTh(props: GambHeadThProps): React.JSX.Element {
	let style = {};
	if(props.header === "status") {

		style = { minWidth: "250px", maxWidth: "250px" };
	}
	if(props.header === "acoes") {

		style = { minWidth: "150px", maxWidth: "150px" };
	}

	return <HeadTh style={style}>{props.children}</HeadTh>;
}
