import { Pagination } from "../GambPaginação/Paginacao";
import { GHeadTh } from "./GHeadTh";
import {
	HeadTr,
	Table,
} from "./tableStyles";
import TableBody from "./tableBody";

export function GambTable({
	data,
	action,
	hiddenFields = [],
	isChamados,
	TableActions,
}: {
	data: Record<string, any>[];
	action: boolean;
	hiddenFields?: string[];
	isChamados?: boolean;
	TableActions?: Record<string, (id: number) => void>;
}) {
	if (data.length === 0) {
		return <p className="mt-4 p-2">Nenhum dado disponível</p>;
	}

	// Filtra os headers removendo os que estão na lista de `hiddenFields`
	const headers = Object.keys(data[0]).filter(
		(header) => !hiddenFields.includes(header)
	);

	
	return (
		<>
			<div style={{ width: "100%", overflowX: "auto" }}>
				<Table style={{ minWidth: "100%" }}>
					<thead>
						<HeadTr>
							{action && <GHeadTh header="acoes">Ações</GHeadTh>}
							{headers.map((header) => (
								<GHeadTh key={header} header={header}>{header}</GHeadTh>
							))}
						</HeadTr>
					</thead>
					<TableBody
						action={action}
						isChamados={isChamados}
						TableActions={TableActions}
						data={data}
						headers={headers}
					/>
				</Table>
			</div>
			<Pagination
				pageIndex={1}
				perPage={data.length}
				totalCount={data.length}
			/>
		</>
	);
}
