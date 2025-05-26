# CDU - Criar Conta

-   **Ator principal**: Visitante
-   **Resumo**: Esse caso de uso permite o visitante ter acesso a criação de uma conta para entrar no sistema.
-   **Pré-condição**: Não possuir uma conta no sistema e estar na pagina de criação de conta
-   **Pós-Condição**: O sistema redireciona o cliente para a página principal da dashboard

## Fluxo Principal

|                   Ações do ator                   |                                         Ações do sistema                                           |
| :-----------------------------------------------: | :------------------------------------------------------------------------------------------------: |
| 1 - O visitante preenche os campos de nome,  usuário,email, cpf e senha                        |                                                       |
|                                                   | 2 - O sistema valida as informações e redireciona o visitante para a página principal da dashboard |

## Fluxo Alternativo I - Informações invalidas

|                   Ações do ator                   |                                          Ações do sistema                                            |
| :-----------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| 1 - O visitante preenche os campos de nome,  usuário,email, cpf e senha                        |                                                         |
|                                                   | 2 - O sistema aponta um erro nas informações invalidas do usuário, nao permitindo a criação da conta |


## Fluxo Alternativo II - Login com Suap

|                   Ações do ator                   |                                         Ações do sistema                                             |
| :-----------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| 1 - O visitante clica no botão "Logar com Suap"     |                                                                                                      |
|                                                   | 2 - O sistema redireciona o visitante para fazer login com sua conta do suap, validando e credenciando, redirecionando o visitante para a dashboard e pedindo para o visitante escolher um nome de usuário para usar a plataforma  |
| 3 - O visitante informa o nome de usuario           |                                                                                                    |
|                                                   | 4 - O sistema libera o uso da plataforma para o visitante |                                  



[Voltar aos Casos de Uso](../cdu.md)
