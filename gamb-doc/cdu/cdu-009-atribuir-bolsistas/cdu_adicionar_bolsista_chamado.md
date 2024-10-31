# CDU - Adicionar um bolsista em um chamado

- **Ator principal**: Professor
- **Atores secundários**: ...  
- **Resumo**: Neste caso de uso, o professor pode adicionar um bolsista para participar da resolução de um chamado
- **Pré-condição**: Estar logado no sistema, ter pelo menos um bolsista cadastrado e estar na página de detalhes do chamado.
- **Pós-condição**: O sistema exibe o(s) bolsista(s) que foi/foram adicionado(s) ao chamado na página de detalhes.

## Fluxo Principal

| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 1 - O professor clica no botão de adicionar bolsista | |  
| | 2 - O sistema abre um modal com a lista dos bolsistas cadastrados |
|3 - O professor seleciona qual/quais bolsista(s) ele deseja atribuir ao chamado e envia as informações |
|| 4 - O sistema salva as informações e exibe o(s) bolsista(s) cadastrado(s) |


## Fluxo Alternativo I - Cancelar Atribuição

| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: |
| 1 - O professor clica no botão de adicionar bolsista | |  
| | 2 - O sistema abre um modal com a lista dos bolsistas cadastrados |
| 3 - O professor desiste da ação e clica no botão de fechar |
|| 4 - O sistema fecha o modal |
