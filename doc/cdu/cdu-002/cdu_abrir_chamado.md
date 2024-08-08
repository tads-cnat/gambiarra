# CDU - Abrir chamado

- **Ator principal**: Cliente
- **Atores secundários**: ...	 
- **Resumo**: Neste caso de uso, o cliente pode abrir um chamado e registrar seu problema a ser resolvido
- **Pré-condição**: Estar logado no sistema na página de perfil
- **Pós-Condição**: O sistema apresenta a tela de detalhes do chamado.

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário clica no botão de abrir chamado | |  
| | 2 - O sistema carrega um formulário para a criação de um chamado | 
| 3 - O usuário preenche as informações do equipamento, descreve o problema e clica no botão de envio para criar o chamado | | 
| | 4 - O sistema registra as informaçõe exibe mensagem de sucesso e o código de referência do chamado |  

## Fluxo Alternativo I - Campo não preenchido
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1.1 - O usuário não preenche todos os campos do formulário | |  
| | 1.2 - O sistema exibe mensagem de erro sinalizando que os campos não foram preenchidos|