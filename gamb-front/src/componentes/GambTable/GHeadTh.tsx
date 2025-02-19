 
import { HeadTh } from "./tableStyles";
import { GambHeadThProps } from "../../interfaces/componentes/iGambHeadTh";

export function GHeadTh(props: GambHeadThProps): JSX.Element {
	return <HeadTh>{props.children}</HeadTh>;
}
