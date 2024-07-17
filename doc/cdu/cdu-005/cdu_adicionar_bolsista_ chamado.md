# CDU - Adicionar um bolsista em um chamado

- **Ator principal**: Professor
- **Atores secundários**: ...	 
- **Resumo**: Neste caso de uso, o professor pode adicionar um bolsista para participar de um chamado
- **Pré-condição**: O professor estar logado, estar na aba do chamado escolhido, ter bolsistas cadastrados na plataforma
- **Pós-condição**: A tela mostra que um bolsista foi adicionado ao chaamdo

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O professor aperta no botão atribuir bolsista | |  
| | 2 - O sistema carrega uma lista dos bolsistas cadastrados|
|3 - O professor seleciona qual bolsista ele quer atribui ao chamado|
| | 4 - O sistema pede uma confirmação|
|5 - O professor confirma|
|| 6- O sistema mostra o bolsista atribuido ao sistema|
 

## Fluxo Alternativo I - Nenhum bolsista cadastrado
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1.1 - O professor aperta no botão atribuir bolsista| |  
| | 1.2 - O sistema carrega a lista de bolsista, porém, está vazia|
| 1.3 - O professor sai do chamado já que não existem bolsistas cadastrados


