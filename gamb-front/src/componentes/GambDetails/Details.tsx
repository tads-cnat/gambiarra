import React from "react";
import GambButton from "../GambButton/Button";
import { Container, Section, Title, Description, Actions, PeopleList, Card, CardContent } from "./detailstyle";
import { ChamadoDetalhesProps } from "../../interfaces/componentes/iGambDetails";

const ChamadoDetalhes: React.FC<ChamadoDetalhesProps> = ({ chamado }) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <Section>
            <Title>Dados gerais</Title>
            <p>
              <strong>Título:</strong> {chamado.titulo}
            </p>
              <strong>Descrição</strong> {chamado.descricao}
            <p>
              <strong>Tipo do item:</strong> {chamado.item.modelo}{" "}
              <strong>Modelo do item:</strong> {chamado.item.modelo}
            </p>
          </Section>

          <Actions>
            <div className="Flex"> 
            <p>Açoes</p>
                <GambButton variant="verde" label="Aceitar" icon="checkcircle"/>
                <GambButton variant="vermelho" label="Recusar" icon="checkcircle"/>
                <GambButton variant="vermelho" label="Arquivar" icon="checkcircle"/>
                <GambButton variant="roxo" label="Fechar Chamado" icon="checkcircle"/>
                <GambButton variant="amarelo" label="Avaliar" icon="checkcircle"/>
                <GambButton variant="cinza" label="Atribuir tarefas" icon="checkcircle"/>
                <GambButton variant="branco" label="Alterar Status" icon="checkcircle"/>
            </div>
          </Actions>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Title>Pessoas</Title>
          <PeopleList>
            <p><strong>Cliente:</strong> {chamado.cliente}</p>
            {chamado.professor && <p><strong>Professor:</strong> {chamado.professor}</p>}
            <p><strong>Bolsistas:</strong></p>
            <ul>
              {chamado.bolsistas.map((bolsista, index) => (
                <li key={index}>{bolsista}</li>
              ))}
            </ul>
          </PeopleList>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ChamadoDetalhes;
