# CDU - Login

-   **Ator principal**: Visitante
-   **Resumo**: Esse caso de uso permite o visitante ter acesso a criação de uma conta para entrar no sistema.
-   **Pré-condição**: Não possuir uma conta no sistema e estar na pagina de criação de conta
-   **Pós-Condição**: O sistema redireciona o cliente para a página principal da dashboard

## Fluxo Principal

|                   Ações do ator                   |                                         Ações do sistema                                         |
| :-----------------------------------------------: | :----------------------------------------------------------------------------------------------: |
| 1 - O visitante preenche os campos de nome,  usuario,email, cpf e senha                        |                                                                                                  |
|                                                   | 2 - O sistema valida as informações e redireciona o visitante para a página principal da dashboard |

## Fluxo Alternativo I - Informações invalidas

|                   Ações do ator                   |                                              Ações do sistema                                        |
| :-----------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| 1 - O visitante preenche os campos de nome,  usuario,email, cpf e senha                        |                                                                                                      |
|                                                   | 2 - O sistema aponta um erro nas informações invalidas do usuario, nao permitindo a criação da conta |

[Voltar aos Casos de Uso](../cdu.md)
