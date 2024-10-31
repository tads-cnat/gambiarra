# CDU - Abrir chamado

- **Ator principal**: Cliente
- **Atores secundários**: ...	 
- **Resumo**: Neste caso de uso, o cliente pode abrir um chamado e registrar seu problema a ser resolvido
- **Pré-condição**: Estar logado no sistema.
- **Pós-Condição**: O sistema apresenta a tela de detalhes do chamado.

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário clica no botão de abrir chamado | |  
| | 2 - O sistema carrega um formulário para a criação de um chamado | 
| 3 - O usuário preenche as informações e clica no botão de envio para criar o chamado | | 
| | 4 - O sistema registra as informações e redireciona o usuário para página de detalhamento do chamado |  

## Fluxo Alternativo I - Campo não preenchido
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1 - O usuário não preenche todos os campos do formulário | |  
| | 2 - O sistema exibe mensagem de erro sinalizando que os campos não foram preenchidos |

## Diagrama de classe de projeto - Abrir Chamado

![diagrama de classe de projeto](../imgs/cproj/abrirchamado.png "Diagrama de classe de projeto - Abrir Chamado")

[Voltar aos Casos de Uso](../cdu.md)
