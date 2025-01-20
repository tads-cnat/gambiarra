import React from "react";
// import { GambTableProps } from "../../interfaces/componentes/iGambTable";
import { BodyTr, HeadTr, } from "./tableStyles";
import { GHeadTh } from "./GHeadTh";
import { GBodyTd } from "./GBodyTd";
import { Pagination } from "../GambPaginação/Paginacao";

export function GambTable() {

	return (
		<>
			<table>
				<thead>
					<HeadTr>
						<GHeadTh children="Ações"/>

                        <GHeadTh children="Status"/>

						<GHeadTh children="Código"/>
                        
						<GHeadTh children="Titulo"/>

						<GHeadTh children="Professor"/>

						<GHeadTh children="Bolsista"/>

						<GHeadTh children="Avaliação"/>

					</HeadTr>
				</thead>
				<tbody>
                    <BodyTr>
                        <GBodyTd children="X X X X" />

                        <GBodyTd children="Aberto" />
                        
                        <GBodyTd children="a45sda6s58" />
                    
                        <GBodyTd children="Titulo legal" />
                        
                        <GBodyTd children="Lucena" />

                        <GBodyTd children="Lg spider" />

                        <GBodyTd children="Brabo" />
                    </BodyTr>

                    <BodyTr>
                        <GBodyTd children="X X X X" />

                        <GBodyTd children="Em analise" />
                        
                        <GBodyTd children="a4a85dASD5" />
                    
                        <GBodyTd children="Titulo nao mt legal" />
                        
                        <GBodyTd children="Jorgiano" />

                        <GBodyTd children="Livia" />

                        <GBodyTd children="MUITO Brabo" />
                    </BodyTr>

                    <BodyTr>
                        <GBodyTd children="X X X X" />

                        <GBodyTd children="Concluido" />
                        
                        <GBodyTd children="8A541DS64" />
                    
                        <GBodyTd children="Computador" />
                        
                        <GBodyTd children="Lucena" />

                        <GBodyTd children="Leonardo" />

                        <GBodyTd children="Muito muito Brabo" />
                    </BodyTr>

                </tbody>
                <Pagination pageIndex={1} perPage={10} totalCount={100} />
			</table>
		</>
	);
}
