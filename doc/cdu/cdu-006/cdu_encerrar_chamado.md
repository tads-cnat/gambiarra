# CDU - Aceitar chamado

- **Ator principal**: Professor
- **Atores secundários**: ...	 
- **Resumo**: Neste caso de uso, o professor pode encerrar o chamado
- **Pré-condição**: Estar logado no sistema na aba do chamado específico
- **Pós-Condição**: O sistema redireciona o usuário para a tela do chamado com status Fechado

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O usuário seleciona opção de Fechar chamado|| |  
| | 2 - O sistema atualiza com uma caixa solicitando para adicionar um comentário e com o botão Fechar chamado| 
| 1 - O usuário adiciona um comentário sobre a finalização e seleciona o botão Fechar chamado| |  
| | 2 - O sistema redireciona para a página do chamado constando com status Fechado| 

## Fluxo Alternativo I - Usuário não insere comentário
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1 - O usuário seleciona opção de Fechar chamado|| |  
| | 1.2 - O sistema atualiza com uma caixa solicitando para adicionar um comentário e com o botão Fechar chamado| 
| 1.3 - O usuário seleciona o botão Fechar chamado| |  
| | 1.4 - O sistema automaticamente deixa a caixa de Adicionar comentário em vermelho solicitando preenchimento| 

## Fluxo Alternativo II - ...
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 2.1 - ... | |  
| | 2.2 - ... |  

> Obs. as seções a seguir apenas serão utilizadas na segunda unidade do PDSWeb (segundo orientações do gerente do projeto).

## Diagrama de Interação (Sequência ou Comunicação)

> Substituir pela imagem correspondente...

## Diagrama de Classes de Projeto

> Substituir pela imagem contendo as classes (modelo, visão e templates) que implementam o respectivo CDU...

