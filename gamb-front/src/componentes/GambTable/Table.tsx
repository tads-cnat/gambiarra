import React from "react";
import { Pagination } from "../GambPaginação/Paginacao";
import { GBodyTd } from "./GBodyTd";
import { GHeadTh } from "./GHeadTh";
import { BodyTr, HeadTr, StatusBadge, Table } from "./tableStyles";
import { getActionsByStatus } from "./actions";

export function GambTable({
	data,
	action,
	hiddenFields = [],
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: Record<string, any>[];
	action: boolean;
	hiddenFields?: string[];
}) {
	if (data.length === 0) {
		return <p>Nenhum dado disponível</p>;
	}

	const isChamados = data.every(
		(item) =>
			"id" in item &&
			"codigo" in item &&
			"titulo" in item &&
			"status" in item
	);

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
							{action && <GHeadTh>Ações</GHeadTh>}
							{headers.map((header) => (
								<GHeadTh key={header}>{header}</GHeadTh>
							))}
						</HeadTr>
					</thead>
					<tbody>
						{data.map((row, index) => (
							<BodyTr key={index}>
								{action && (
									<GBodyTd>
										{getActionsByStatus(
											row.status.id,
											row.id
										)}
									</GBodyTd>
								)}

								{headers.map((header) => (
									<GBodyTd key={header}>
										{isChamados &&
										header === "avaliacao" &&
										row.avaliacao ? (
											<div className="flex flex-col justify-center">
												<span className="font-bold mb-1">
													{String(
														row.avaliacao.texto
													)}
												</span>
												<span className="star-rating">
													{"⭐".repeat(
														row.avaliacao.nota
													) +
														"☆".repeat(
															5 -
																row.avaliacao
																	.nota
														)}
												</span>
											</div>
										) : isChamados &&
										  header === "status" ? (
											<StatusBadge status={row.status.id}>
												{String(row.status.nome)}
											</StatusBadge>
										) : header === "bolsistas" ? (
											String(
												row.bolsistas
													.map(
														(bolsista) =>
															bolsista.username
													)
													.join(", ")
											)
										) : header === "professor" ? (
											String(row.professor.username)
										) : header === "cliente" ? (
											String(row.cliente.username)
										) : (
											String(row[header])
										)}
										
									</GBodyTd>
								))}
							</BodyTr>
						))}
					</tbody>
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
