import React from "react";
import { GambTableProps } from "../../interfaces/componentes/iGambTable";
import { BodyTd, BodyTr, HeadTh, HeadTr, } from "./tableStyles";

export function GambTable(props: GambTableProps) {
	return (
		<>
			<table>
				<thead>
					<HeadTr>
						<HeadTh>
                            Ações
                        </HeadTh>

                        <HeadTh>
                            Status
                        </HeadTh>

                        <HeadTh>
                            Codigo
                        </HeadTh>
                        
                        <HeadTh >
                            Titulo
                        </HeadTh>

                        <HeadTh>
                            Professor
                        </HeadTh>

                        <HeadTh>
                            Bolsista
                        </HeadTh>

                        <HeadTh>
                            Avaliação
                        </HeadTh>

					</HeadTr>
				</thead>
				<tbody>
                    <BodyTr>
                        <BodyTd>
                            X
                        </BodyTd>

                        <BodyTd>
                            aberto
                        </BodyTd>
                        
                        <BodyTd>
                            5as254
                        </BodyTd>
                    
                        <BodyTd>
                            AAAAAA
                        </BodyTd>
                        
                        <BodyTd>
                            Lucena
                        </BodyTd>
                        <BodyTd>
                            Lg spider
                        </BodyTd>
                        <BodyTd>
                            Brabo
                        </BodyTd>
                    </BodyTr>

                    <BodyTr>
                        <BodyTd>
                            X
                        </BodyTd>

                        <BodyTd>
                            aberto
                        </BodyTd>
                        
                        <BodyTd>
                            5as254
                        </BodyTd>
                    
                        <BodyTd>
                            AAAAAA
                        </BodyTd>
                        
                        <BodyTd>
                            Lucena
                        </BodyTd>
                        <BodyTd>
                            Lg spider
                        </BodyTd>
                        <BodyTd>
                            Brabo
                        </BodyTd>
                    </BodyTr> 

                    <BodyTr>
                        <BodyTd>
                            X
                        </BodyTd>

                        <BodyTd>
                            aberto
                        </BodyTd>
                        
                        <BodyTd>
                            5as254
                        </BodyTd>
                    
                        <BodyTd>
                            AAAAAA
                        </BodyTd>
                        
                        <BodyTd>
                            Lucena
                        </BodyTd>
                        <BodyTd>
                            Lg spider
                        </BodyTd>
                        <BodyTd>
                            Brabo
                        </BodyTd>
                    </BodyTr>
                </tbody>
			</table>
		</>
	);
}
