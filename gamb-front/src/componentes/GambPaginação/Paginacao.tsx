import { PageCol, PageLine } from "./PaginacaoStyles.ts"
import GambButton from "../GambButton/Button.tsx"

interface PaginationProps{
    pageIndex: number,
    totalCount: number,
    perPage: number
}
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
