# CDU - Adicionar um bolsista em um chamado

- **Ator principal**: Professor
- **Atores secundários**: ...  
- **Resumo**: Neste caso de uso, o professor pode adicionar um bolsista para participar da resolução de um chamado
- **Pré-condição**: Estar logado no sistema, ter pelo menos um bolsista cadastrado e estar na página de detalhes do chamado.
- **Pós-condição**: O sistema exibe mensagem indicando que o bolsista foi adicionado ao chamado

## Fluxo Principal

| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 1 - O professor clica em um campo de seleção de bolsistas  | |  
| | 2 - O sistema carrega a lista dos bolsistas cadastrados |
|3 - O professor seleciona qual bolsista ele quer atribuir ao chamado |
| | 4 - O sistema pede uma confirmação |
|5 - O professor confirma |
|| 6- O sistema exibe mensagem de sucesso e o bolsista atribuido ao chamado |


## Fluxo Alternativo I - Bolsista já atribuído ao chamado

| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1.1 - O professor clica em um campo de seleção de bolsistas  | |  
| | 1.2 - O sistema carrega a lista dos bolsistas cadastrados |
| 1.3 - O professor seleciona qual bolsista ele quer atribuir ao chamado | |  
| | 1.4 - O sistema pede uma confirmação |
| 1.5 - O professor confirma |
|| 1.6 - O sistema exibe uma mensagem de erro sinalizando que aquele bolsista já foi atribuído àquele chamado |