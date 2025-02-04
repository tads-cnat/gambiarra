# CDU - Analisar Chamado

-   **Ator principal**: Professor
-   **Atores secundários**: ...
-   **Resumo**: Neste caso de uso, o professor pode aceitar o chamado
-   **Pré-condição**: Estar logado no sistema na lista de chamados
-   **Pós-Condição**: O sistema redireciona o professor para a tela de detalhes do chamado

## Fluxo - Aceitar Chamado

|                               Ações do ator                                |                                                      Ações do sistema                                                       |
| :------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: |
| 1 - O Professor, na linha do chamado pretendido, clica no botão de aceitar |                                                                                                                             |
|                                                                            | 2 - O sistema redireciona o Professor para a página de detalhes do chamado, exibe mensagem de sucesso e o status atualizado para "Aceito"|


## Fluxo Alternativo - Recusar Chamado

|                               Ações do ator                                |                                                      Ações do sistema                                                       |
| :------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: |
| 1 - O Professor, na linha do chamado pretendido, clica no botão de recusar |                                                                                                                             | 
|                                                                            | 2 - O sistema solicita ao professor uma justificativa para a ação                                                         |
| 3 - O Professor insere a justificativa e clica em recusar                  |                                                                                                                             |
|                                                                            | 4 - O sistema redireciona o Professor para a página de detalhes do chamado, exibe mensagem de sucesso e o status atualizado para "Recusado" |



## Diagrama de atividades - Aceitar Chamado

![diagrama de atividades](../imgs/atividades/ativ_aceitar_chamado.jpg "Diagrama de atividades - Aceitar Chamado")


## Diagrama de Sequência - Aceitar Chamado

![diagrama de sequência aceitar chamado](img/aceitar_seq.png "Diagrama sequência - Aceitar Chamado")

