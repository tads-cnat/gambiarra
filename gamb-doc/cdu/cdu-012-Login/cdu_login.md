# CDU - Login

-   **Ator principal**: Cliente
-   **Atores secundários**: Professor, Bolsista
-   **Resumo**: Esse caso de uso permite o cliente ter acesso a todas as funcionalidades do projeto
-   **Pré-condição**: Possuir uma conta no sistema e estar na página de login
-   **Pós-Condição**: O sistema redireciona o cliente para a página principal da dashboard

## Fluxo Principal

|                   Ações do ator                   |                                         Ações do sistema                                         |
| :-----------------------------------------------: | :----------------------------------------------------------------------------------------------: |
| 1 - O cliente preenche os campos de email e senha |                                                                                                  |
|                                                   | 2 - O sistema valida as informações e redireciona o cliente para a página principal da dashboard |

## Fluxo Alternativo I - Usuário não cadastrado

|                   Ações do ator                   |                        Ações do sistema                        |
| :-----------------------------------------------: | :------------------------------------------------------------: |
| 1 - O usuário preenche os campos de email e senha |                                                                |
|                                                   | 2 - O sistema invalida as informações e exibe mensagem de erro |

[Voltar aos Casos de Uso](../cdu.md)
