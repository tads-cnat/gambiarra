import React, { useEffect, useState } from "react";
// import { GambTableProps } from "../../interfaces/componentes/iGambTable";
import { BodyTr, HeadTr, } from "./tableStyles";
import { GHeadTh } from "./GHeadTh";
import { GBodyTd } from "./GBodyTd";
import { Pagination } from "../GambPaginação/Paginacao";
import axiosInstance from "../../services/base/axiosInstance";

export function GambTable() {



    type Chamado = {
        id: number;
        codigo: string;
        status: string;
        titulo: string;
        professor: string;
        bolsista: string;
        avaliacao: string;
      };

      const chamadosmock:Chamado[] = [
        {
            id: 1,
            codigo: "CH001",
            titulo: "Chamado 1",
            status: "aberto",
            professor: "Professor A",
            bolsista: "Bolsista X",
            avaliacao: "muito bom"
          },
          {
            id: 2,
            codigo: "CH002",
            titulo: "Chamado 2",
            status: "fechado",
            professor: "Professor A",
            bolsista: "Bolsista X",
            avaliacao: "muito bom"
          },
          {
            id: 3,
            codigo: "CH003",
            titulo: "Chamado 3",
            status: "em analise",
            professor: "Professor A",
            bolsista: "Bolsista X",
            avaliacao: "muito bom"
          },
    ]

    const [chamados, setChamados] = useState<Chamado[]>([]);

    useEffect(() => {
        // Buscar os chamados da API
        axiosInstance.get('http://127.0.0.1:8000/api/chamados/')
          .then((response) => {
            setChamados(response.data);
          })
          .catch((error) => {
            console.error('Erro ao buscar os chamados:', error);
          });
      }, []);

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
                    {chamadosmock.map((chamado) => (
                
                    <BodyTr key={chamado.id}>
                        <GBodyTd children="X X" />

                        <GBodyTd children={chamado.status} />

                        <GBodyTd children={chamado.codigo} />
                        
                        <GBodyTd children={chamado.titulo} />
                    
                        <GBodyTd children={chamado.professor} />
                        
                        <GBodyTd children={chamado.bolsista} />

                        <GBodyTd children={chamado.avaliacao} />
                    </BodyTr>
                    ))}

                    {/* <BodyTr>
                        <GBodyTd children="X X X X" />

                        <GBodyTd children="Concluido" />
                        
                        <GBodyTd children="8A541DS64" />
                    
                        <GBodyTd children="Computador" />
                        
                        <GBodyTd children="Lucena" />

                        <GBodyTd children="Leonardo" />

                        <GBodyTd children="Muito muito Brabo" />
                    </BodyTr> */}

                </tbody>
                <Pagination pageIndex={1} perPage={chamadosmock.length} totalCount={chamadosmock.length} />
			</table>
		</>
	);
}
