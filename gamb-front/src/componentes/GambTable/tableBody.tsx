import { getActionsByStatus } from "./actions";
import { GBodyTd } from "./GBodyTd";
import { BodyTr, ChamadosBadge, StatusBadge } from "./tableStyles";


interface TableBodyProps {
    action: boolean;
	hiddenFields?: string[];
	isChamados?: boolean;
	TableActions?: Record<string, (id: number) => void>;
    data:  Record<string, any>[]
    headers: string[];
}

interface Avaliacao {
	texto: string;
	nota: number;
}

function renderCellContent(
	header: string,
	row: Record<string, any>,
	isChamados?: boolean
): string | React.JSX.Element {
	if (header === "avaliacao" && row.avaliacao) {
		const avaliacao: Avaliacao = row.avaliacao as Avaliacao;
		return (
			<div className="flex flex-col justify-center">
				<span className="font-bold mb-1">
					{String(avaliacao.texto)}
				</span>
				<span className="star-rating">
					{"⭐".repeat(avaliacao.nota) +
						"☆".repeat(5 - avaliacao.nota)}
				</span>
			</div>
		);
	}
	if (isChamados && header === "status") {
		return (
			<>
				<StatusBadge $status={row.status?.id}></StatusBadge>
				<ChamadosBadge $status={row.status?.id}>
					{String(row.status?.nome)}
				</ChamadosBadge>
			</>
		);
	}
	if (header === "bolsistas") {
		return (
			row.bolsistas
				?.map((b: { id: number; username: string }) => b.username)
				.join(", ") || "-"
		);
	}
	if (header === "professor") {
		return row.professor?.username || "-";
	}
	if (header === "cliente") {
		return row.cliente?.username || "-";
	}
	return String(row[header] ?? "-");
}

export default function TableBody(props: TableBodyProps) {
	const { action, isChamados, TableActions, data, headers } = props;
	return (
		<>
			<tbody>
				{data.map((row, index) => (
					<BodyTr key={index}>
						{action && (
							<GBodyTd header="acoes">
								{getActionsByStatus(
									row.status?.id,
									row.id,
									TableActions
								)}
							</GBodyTd>
						)}

						{headers.map((header) => (
							<GBodyTd key={header} header={header}>
								{renderCellContent(header, row, isChamados)}
							</GBodyTd>
						))}
					</BodyTr>
				))}
			</tbody>
		</>
	);
}