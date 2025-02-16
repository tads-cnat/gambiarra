import React from "react"
import { PaginationProps } from "../../interfaces/componentes/iGambPaginacao.ts"
import { PageCol, PageLine } from "./PaginacaoStyles.ts"
import GambButton from "../GambButton/Button.tsx"


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
                {/* <button> <CaretLeft /></button>
                <button> <CaretRight /> </button> */}
                <GambButton variant="circle" icon="seta_esquerda" />
                <GambButton variant="circle" icon="seta_direita" />
            </PageCol>

        </PageLine>
    )
}
