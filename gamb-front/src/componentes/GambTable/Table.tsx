// import { useEffect, useState } from "react";
import { BodyTr, HeadTr } from "./tableStyles";
import { GHeadTh } from "./GHeadTh";
import { GBodyTd } from "./GBodyTd";
import { Pagination } from "../GambPaginação/Paginacao";
// import axiosInstance from "../../services/base/axiosInstance";

export function GambTable({ data }: { data: Record<string, any>[] }) {
    if (data.length === 0) {
        return <p>Nenhum dado disponível</p>;
    }

    const headers = Object.keys(data[0]);

    return (
        <>
            <table>
                <thead>
                    <HeadTr>
                        <GHeadTh children="Ações" />
                        {headers.map((header) => (
                            <GHeadTh key={header} children={header} />
                        ))}
                    </HeadTr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <BodyTr key={index}>
                            <GBodyTd children="X X" />
                            {headers.map((header) => (
                                <GBodyTd key={header} children={String(row[header])} />
                            ))}
                        </BodyTr>
                    ))}
                </tbody>
                <Pagination pageIndex={1} perPage={data.length} totalCount={data.length} />
            </table>
        </>
    );
}
