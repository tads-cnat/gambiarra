import { HeadTh } from "./tableStyles";
import { GambHeadThProps } from "../../interfaces/componentes/iGambHeadTh";

export function GHeadTh(props: GambHeadThProps): React.JSX.Element {
	return <HeadTh>{props.children}</HeadTh>;
}
