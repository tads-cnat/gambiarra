# CDU - Cadastro de Usuários


* **Ator Principal**: Visitante
* **Resumo**: Permite ao visitante criar uma conta para aceder ao sistema.
* **Pré-condição**: Não ter conta no sistema e estar na página de criação de conta.
* **Pós-condição**: Visitante é redirecionado para a dashboard principal.

## Fluxo Principal

| Ações do Ator                                                 | Ações do Sistema                                             |
| ------------------------------------------------------------- | ------------------------------------------------------------ |
| 1. Preenche os campos: nome, utilizador, e-mail, CPF e senha. | 2. Valida os dados e redireciona para a dashboard principal. |

## Fluxo Alternativo I - Dados Inválidos

| Ações do Ator                                                 | Ações do Sistema                                                 |
| ------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1. Preenche os campos: nome, utilizador, e-mail, CPF e senha. | 2. Informa erro nos dados inválidos e impede a criação da conta. |

## Fluxo Alternativo II - Login com SUAP

| Ações do Ator                    | Ações do Sistema                                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 1. Clica em "Entrar com SUAP".   | 2. Redireciona para o login SUAP, valida o acesso e redireciona para a dashboard. Solicita nome de utilizador. |
| 3. Informa o nome de utilizador. | 4. Libera o acesso completo à plataforma.                                                                      |


[Voltar aos Casos de Uso](../cdu.md)
