# CDU - Cadastro de Usuários


* **Ator Principal**: Visitante
* **Resumo**: Permite ao visitante criar uma conta para aceder ao sistema.
* **Pré-condição**: Não ter conta no sistema e estar na página de criação de conta.
* **Pós-condição**: Visitante é redirecionado para a dashboard principal.

## Fluxo Principal

|                                Ações do ator                                |                                     Ações do sistema                                     |
| :-------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| 1 - O visitante preenche os campos de nome, utilizador, e-mail, CPF e senha |                                                                                          |
|                                                                             | 2 - O sistema valida as informações e redireciona o visitante para a dashboard principal |


## Fluxo Alternativo I - Dados Inválidos

|                                Ações do ator                                |                                      Ações do sistema                                      |
| :-------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| 1 - O visitante preenche os campos de nome, utilizador, e-mail, CPF e senha |                                                                                            |
|                                                                             | 2 - O sistema identifica erros nos dados e exibe uma mensagem de erro, impedindo o registo |


## Fluxo Alternativo II - Login com SUAP

|                   Ações do ator                  |                               Ações do sistema                              |
| :----------------------------------------------: | :-------------------------------------------------------------------------: |
| 1 - O visitante clica no botão "Entrar com SUAP" |                                                                             |
|                                                  |   2 - O sistema redireciona para o login SUAP, valida e credencia o acesso  |
|   3 - O visitante informa um nome de utilizador  |                                                                             |
|                                                  | 4 - O sistema conclui o registo e redireciona o utilizador para a dashboard |


[Voltar aos Casos de Uso](../cdu.md)
