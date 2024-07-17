# CDU - Avaliar chamado

- **Ator principal**: Cliente
- **Atores secundários**: ...	 
- **Resumo**: Esse caso de uso permite o usuário avaliar um serviço depois de concluído
- **Pré-condição**: Possuir uma conta no sistema e estar na página de detalhes de um chamado
- **Pós-Condição**: O sistema substitui a função de avaliar pela avaliação do usuario

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário clica em avaliar serviço | |  
| | 2 - O sistema apresenta uma tela de avaliação para o usuário com a escolha de 1 a 5 estrelas e uma aba de comentário | 
| 3 - O usuário avalia o serviço corretamente e clicar em enviar | | 
| | 4 - O sistema retorna uma mensagem confirmando a avaliação |  

## Fluxo Alternativo I - Dados nao preenchidos
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1.1 - O usuário não escolhe quantas estrelas ele vai avaliar o serviço | |  
| | 1.2 - O sistema apresenta uma mensagem abaixo das estrelas "Preencher esse campo é obrigatorio"|



