import React from "react";
import { BodyTr, HeadTr } from "./tableStyles";
import { GHeadTh } from "./GHeadTh";
import { GBodyTd } from "./GBodyTd";
import { Pagination } from "../GambPaginação/Paginacao";
import Notificacao from "../GambNotificao/Notificacao";

const actionIcons: Record<string, string> = {
    aceitar: "checks",
    recusar: "xcircle",
    arquivar: "archive",
    detalhar: "eyeopen",
    avaliar: "star",
    resolver: "checkcircle",
    chat: "chat"
};

const actionColors: Record<string, string> = {
    aceitar: "#12A400",
    resolver: "#12A400",
    recusar: "#DC3545",
    arquivar: "#DC3545",
    detalhar: "#7C74DA",
    avaliar: "#FFD454",
    chat: "#61B3FF"
};

const getActionsByStatus = (status: string): string[] => {
    switch (status.toLowerCase()) {
        case "em analise":
            return ["aceitar", "recusar", "detalhar"];
        case "aceito":
            return ["detalhar", "chat", "resolver"];
        case "resolvido":
            return ["arquivar"];
        default:
            return ["xcircle"];
    }
};

function StarRating({ rating }: { rating: number }) {
    return (
        <span className="star-rating">{"⭐".repeat(rating) + "☆".repeat(5 - rating)}</span>
    );
}

function StatusBadge({ status }: { status: string }) {
    return (
        <span className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md text-sm font-bold">{status}</span>
    );
}

export function GambTable({ data, action}: { data: Record<string, any>[], action: boolean }) {
    if (data.length === 0) {
        return <p>Nenhum dado disponível</p>;
    }

    const isChamados = data.every(item => "id" in item && "codigo" in item && "titulo" in item && "status" in item);
    const headers = Object.keys(data[0]);

    return (
        <>
            <table>
                <thead>
                    <HeadTr>
                        {action ? (
                            <>
                                <GHeadTh children="Ações" />
                                {headers.map((header) => (
                                    <GHeadTh key={header} children={header} />
                                ))}
                            </>
                        ) : (
                            headers.map((header) => (
                                <GHeadTh key={header} children={header} />
                            ))
                        )}
                        
                    </HeadTr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <BodyTr key={index}>
                            {action ? (
                                <GBodyTd>
                                {getActionsByStatus(String(row.status)).map(action => (
                                    <Notificacao 
                                        key={action} 
                                        icon={actionIcons[action]} 
                                        backgroundColor={actionColors[action]} 
                                        size={30} 
                                        iconColor="#FFFFFF"
                                        {...(row.badgeNumber ? { badgeNumber: row.badgeNumber } : {})} 
                                    />
                                ))}
                            </GBodyTd>
                            ) : (<></>
                            )}
                            {headers.map((header) => (
                                <GBodyTd key={header}>
                                    {isChamados && header === "avaliacao" && Array.isArray(row[header]) && row[header].length === 2 && typeof row[header][1] === "number" ? (
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <span className="font-bold mb-1">{row[header][0]}</span>
                                            <StarRating rating={Number(row[header][1])} />
                                        </div>
                                    ) : isChamados && header === "status" ? (
                                        <StatusBadge status={String(row[header])} />
                                    ) : (
                                        String(row[header])
                                    )}
                                </GBodyTd>
                            ))}
                        </BodyTr>
                    ))}
                </tbody>
                <Pagination pageIndex={1} perPage={data.length} totalCount={data.length} />
            </table>
        </>
    );
}
