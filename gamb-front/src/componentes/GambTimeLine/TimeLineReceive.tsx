/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../services/base/axiosInstance";
import { useEffect, useState } from "react";
import Timeline from "./TimeLine";
import type { StatusType } from "../../interfaces/componentes/iGambTimeLine";



export function RequestTimeLine(props: {id: number}): JSX.Element {

    const { id } = props;
    const [ timeLine, setTimeLine ] = useState<StatusType[]>([]);

  

    async function handleTimeLine(id: number) {
        await axiosInstance.get(`/chamados/${id}/alteracoes/`).then((response) => {
            const result = response.data.map((alt: any) => {
                let color = "";
                let label = "";
                if(alt.status.id === 1){
                    color = "#6c757d";
                    label = "Em análise";
                }else if(alt.status.id === 2){
                    color = "#28a745";
                    label = "Aceito";
                }else if(alt.status.id === 3){
                    color= "#FFC222";
                    label = "Em Diagnóstico";
                }else if(alt.status.id === 4){
                    color= "#28a745";
                    label = "Equipamento Em Conserto";
                }else if(alt.status.id === 5){
                    color= "#FFC222";
                    label = "Aguardando Peça";
                }else if(alt.status.id === 6){
                    color= "#28a745";
                    label = "Fechado Sem Resolução";
                }else if(alt.status.id === 7){
                    color= "#FFC222";
                    label = "Resolvido";
                }else if(alt.status.id === 8){
                    color= "#FFC222";
                    label= "Recusado";
                    
                }

                return {
                    label: label,
                    color: color,
                    tooltip: alt.data_alteracao,

                };
            });
            setTimeLine(result);
        }).catch((error) => {
            console.error("Erro ao buscar timeline:", error);
        }
        );

    }
    
    useEffect(() => {
        handleTimeLine(id);
    }, [id]);

  return (
    <>
        <Timeline status={timeLine} />
   
    </>
  );
}