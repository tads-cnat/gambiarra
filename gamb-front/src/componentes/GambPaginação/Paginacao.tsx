import React from "react"
import { PaginationProps } from "../../interfaces/componentes/iGambPaginacao.ts"
import { PageCol, PageLine } from "./PaginacaoStyles.ts"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"


export function Pagination(props: PaginationProps){
    const {pageIndex, totalCount, perPage} = props

    const pages = Math.ceil(totalCount / perPage) || 1

    return (
        <PageLine>
            <PageCol>
                {perPage} itens de {totalCount} 
            </PageCol>

            <PageCol>

            </PageCol>

            <PageCol>
                 
            </PageCol>

            <PageCol>
                {pageIndex} de {pages}
                <button> <CaretLeft /></button>
                <button> <CaretRight /> </button>
            </PageCol>

        </PageLine>
    )
}
