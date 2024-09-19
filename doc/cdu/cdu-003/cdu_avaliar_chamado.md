# CDU - Avaliar chamado

- **Ator principal**: Cliente
- **Atores secundários**: ...	 
- **Resumo**: Esse caso de uso permite o cliente avaliar um serviço depois de concluído
- **Pré-condição**: Estar logado no sistema, estar na página principal da dashboard e o chamado estar fechado.

- **Pós-Condição**: O sistema retira opção de avaliar da listagem e exibe a avaliação na página de detalhes do chamado 

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O Cliente, na linha do chamado pretendido,  clica no botão de avaliar | |  
| | 2 - O sistema abre o modal de avaliação, onde o Cliente informa um número 1 a 5 e adiciona um comentário | 
| 3 - O Cliente clica no botão de envio enviar | | 
| | 4 -  O sistema redireciona o Cliente para a página de detalhes do chamado, e exibe a avaliação cadastrada |  

## Fluxo Alternativo I - Dados nao preenchidos
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1 - O Cliente não informa um número  | |  
| | 2 - O sistema exibe uma mensagem de erro sinalizando que o campo não foi preenchido "|



