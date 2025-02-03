import React from "react";
import Notificacao from "../GambNotificao/Notificacao";
import { Pagination } from "../GambPaginação/Paginacao";
import { GBodyTd } from "./GBodyTd";
import { GHeadTh } from "./GHeadTh";
import { BodyTr, HeadTr } from "./tableStyles";

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
    const normalizedStatus = status?.toLowerCase().trim(); // Evita erros com espaços extras ou `null`
    
    switch (normalizedStatus) {
        case "em analise":
            return ["aceitar", "recusar", "detalhar"];
        case "aceito":
            return ["detalhar", "chat", "resolver"];
        case "resolvido":
            return ["arquivar"];
        default:
            return []; 
    }
};


function StarRating({ rating }: { rating: number }) {
    return (
        <span className="star-rating">{"⭐".repeat(rating) + "☆".repeat(5 - rating)}</span>
    );
}

function StatusBadge({ status }: { status: string }) {
    // Mapeia os status para cores específicas
    const statusColors: Record<string, string> = {
        "em analise": "bg-gray-400 text-gray-900",
        "aceito": "bg-yellow-300 text-yellow-800",
        "resolvido": "bg-green-300 text-green-800",
        "recusado": "bg-red-300 text-red-800",
        "arquivado": "bg-gray-400 text-gray-900"
    };

    // Define a cor de fundo com base no status ou usa uma padrão
    const bgColor = statusColors[status.toLowerCase()] || "bg-gray-300 text-gray-700";

    return (
        <span className={`px-2 py-1 rounded-md text-sm font-bold ${bgColor}`}>
            {status}
        </span>
    );
}


export function GambTable({ data, action, hiddenFields = [] }: { 
    data: Record<string, any>[]; 
    action: boolean; 
    hiddenFields?: string[];
}) {
    if (data.length === 0) {
        return <p>Nenhum dado disponível</p>;
    }

    const isChamados = data.every(item => "id" in item && "codigo" in item && "titulo" in item && "status" in item);
    
    // Filtra os headers removendo os que estão na lista de `hiddenFields`
    const headers = Object.keys(data[0]).filter(header => !hiddenFields.includes(header));

    return (
        <>
            <table>
                <thead>
                    <HeadTr>
                        {action && <GHeadTh children="Ações" />}
                        {headers.map((header) => (
                            <GHeadTh key={header} children={header} />
                        ))}
                    </HeadTr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <BodyTr key={index}>
                            {action && (
                                <GBodyTd>
                                    {getActionsByStatus(String(row.status)).map(action => (
                                        <Notificacao 
                                            key={action} 
                                            icon={actionIcons[action]} 
                                            backgroundColor={actionColors[action]} 
                                            size={30} 
                                            iconColor="#FFFFFF"
                                        />
                                    ))}
                                </GBodyTd>
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

