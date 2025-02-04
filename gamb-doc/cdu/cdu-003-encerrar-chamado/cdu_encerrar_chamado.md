# CDU - Encerrar chamado

-   **Ator principal**: Professor
-   **Atores secundários**: ...
-   **Resumo**: Neste caso de uso, o professor pode encerrar o chamado
-   **Pré-condição**: Estar logado no sistema e estar na página de listagem dos chamados
-   **Pós-Condição**: O sistema redireciona o professor para a tela de detalhes do chamado com o status atualizado

## Fluxo Principal - Fechado com Resolução

| **Ações do Ator**                                                                                                                  | **Ações do Sistema**                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 - O Professor, na linha do chamado pretendido, clica no botão de encerrar.                                                       |                                                                                                                                                                                               |
|                                                                                                                                    | 2 - O sistema exibe uma opção para o Professor selecionar o tipo de encerramento: **"Fechado com Resolução"** ou **"Fechado sem Resolução"**.                                                 |
| 3 - O Professor seleciona **"Fechado com Resolução"**.                                                                             |                                                                                                                                                                                               |
|                                                                                                                                    | 4 - O sistema solicita ao professor uma justificativa para a ação.                                                                                                                            |
| 5 - O Professor informa a justificativa, detalhando como o chamado foi resolvido, e confirma a ação clicando no botão de encerrar. |                                                                                                                                                                                               |
|                                                                                                                                    | 6 - O sistema valida a justificativa, encerra o chamado com status **"Fechado com Resolução"**, e redireciona o Professor para a página de detalhes do chamado, exibindo o status atualizado. |

## Fluxo Principal - Fechado sem Resolução

| **Ações do Ator**                                                                                                                                               | **Ações do Sistema**                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 - O Professor, na linha do chamado pretendido, clica no botão de encerrar.                                                                                    |                                                                                                                                                                                               |
|                                                                                                                                                                 | 2 - O sistema exibe uma opção para o Professor selecionar o tipo de encerramento: **"Fechado com Resolução"** ou **"Fechado sem Resolução"**.                                                 |
| 3 - O Professor seleciona **"Fechado sem Resolução"**.                                                                                                          |                                                                                                                                                                                               |
|                                                                                                                                                                 | 4 - O sistema solicita ao professor uma justificativa para a ação.                                                                                                                            |
| 5 - O Professor informa a justificativa, explicando o motivo pelo qual o chamado será encerrado sem resolução, e confirma a ação clicando no botão de encerrar. |                                                                                                                                                                                               |
|                                                                                                                                                                 | 6 - O sistema valida a justificativa, encerra o chamado com status **"Fechado sem Resolução"**, e redireciona o Professor para a página de detalhes do chamado, exibindo o status atualizado. |

## Fluxo Alternativo I - Cancelar Encerramento

|                                Ações do ator                                |                            Ações do sistema                            |
| :-------------------------------------------------------------------------: | :--------------------------------------------------------------------: | 
| 1 - O Professor, na linha do chamado pretendido, clica no botão de encerrar |                                                                        |   
|                                                                             | 2 - O sistema abre uma modal de confirmação do encerramento do chamado |
|        3 - O Professor desiste da ação clicando no botão de cancelar        |                                                                        |
|                                                                             |       4 - O sistema fecha o modal de confirmação de encerramento       |

## Diagrama de Sequência - Encerrar Chamado

![diagrama de sequência encerrar chamado](img/encerrar_seq.png "Diagrama sequência - Encerrar Chamado")

[Voltar aos Casos de Uso](../cdu.md)
