import React from "react";
// import { GambTableProps } from "../../interfaces/componentes/iGambTable";
import { BodyTd, BodyTr, HeadTr, } from "./tableStyles";
import { GHeadTh } from "./GHeadTh";
import { GBodyTd } from "./GBodyTd";

export function GambTable() {

	return (
		<>
			<table>
				<thead>
					<HeadTr>
						<GHeadTh title="Ações"/>

                        <GHeadTh title="Status"/>

						<GHeadTh title="Código"/>
                        
						<GHeadTh title="Titulo"/>

						<GHeadTh title="Professor"/>

						<GHeadTh title="Bolsista"/>

						<GHeadTh title="Avaliação"/>

					</HeadTr>
				</thead>
				<tbody>
                    <BodyTr>
                        <GBodyTd content="X X X X" />

                        <GBodyTd content="Aberto" />
                        
                        <GBodyTd content="a45sda6s58" />
                    
                        <GBodyTd content="Titulo legal" />
                        
                        <GBodyTd content="Lucena" />

                        <GBodyTd content="Lg spider" />

                        <GBodyTd content="Brabo" />
                    </BodyTr>

                    <BodyTr>
                        <GBodyTd content="X X X X" />

                        <GBodyTd content="Em analise" />
                        
                        <GBodyTd content="a4a85dASD5" />
                    
                        <GBodyTd content="Titulo nao mt legal" />
                        
                        <GBodyTd content="Jorgiano" />

                        <GBodyTd content="Livia" />

                        <GBodyTd content="MUITO Brabo" />
                    </BodyTr>

                    <BodyTr>
                        <GBodyTd content="X X X X" />

                        <GBodyTd content="Concluido" />
                        
                        <GBodyTd content="8A541DS64" />
                    
                        <GBodyTd content="Computador" />
                        
                        <GBodyTd content="Lucena" />

                        <GBodyTd content="Leonardo" />

                        <GBodyTd content="Muito muito Brabo" />
                    </BodyTr>

                </tbody>
			</table>
		</>
	);
}
