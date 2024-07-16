# CDU - Encerrar chamado

- **Ator principal**: Professor
- **Atores secundários**: ...	 
- **Resumo**: Neste caso de uso, o professor pode encerrar o chamado
- **Pré-condição**: Estar logado no sistema em detalhes do chamado
- **Pós-Condição**: O sistema redireciona o professor para a tela de detalhes do chamado com status Fechado

## Fluxo Principal
| Ações do ator | Ações do sistema |
| :-----------------: | :-----------------: | 
| 1 - O professor seleciona o botão "Fechar chamado"|| |  
| | 2 - O sistema abre uma caixa confirmando o encerramento do chamado com botões para "Encerrar" ou "Cancelar"|    
| 1 - O professor clica no botão "Encerrar"| |  
| | 2 - O sistema redireciona para a página do chamado mudando o status para "Fechado"| 

## Fluxo Alternativo I - Cancelar Encerramento
| Ações do ator | Ações do sistema |
| :-----------------: |:-----------------: | 
| 1 - O professor seleciona o botão "Fechar chamado"|| |  
| | 1.2 - O sistema abre uma caixa confirmando o encerramento do chamado com botões para "Encerrar" ou "Cancelar"| 
| 1.3 - O professor seleciona o botão "Cancelar"| |  
| | 1.4 - A caixa de confirmação fecha e o professor volta para a tela de detalhes do chamado| 

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

