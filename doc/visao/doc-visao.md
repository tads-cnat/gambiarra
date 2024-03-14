# Documento de Visão

## Histórico de Revisões

| Data       | Versão | Descrição                | Autor                        |
|------------|--------|--------------------------|------------------------------|
| 27/02/2024 | 1.0    | Início da documentação  | Todos os integrantes da equipe |
| 13/03/2024 | 1.1    | Finalizada primeira versão | Todos os integrantes da equipe |




## 1. Objetivo do projeto

Desenvolver um sistema web de gerenciamento de chamados de manutenção técnica. Afim de oferecer suporte para professores de manutenção de computadores promoverem uma boa prática de ensino.

## 2. Descrição do problema

|     |      |
| --- | --- |
| **Problema**            | falta de computadores para prática nas disciplinas de manutenção e suporte do ensino médio integrado no campus CNAT |
| **Afeta**               | os alunos de cursos técnicos, os professores das disciplinas e a instituição de ensino |  
| **Impacta**             | o baixo aprendizado prático durante a matéria de manutenção de computadores |
| **Solução**             | Uma plataforma que conecta usuários que necessitam de manutenção em computadores com professores e alunos que carecem de máquinas para a prática de manutenção de computadores. | 

## 3. Descrição dos usuários 

| Nome                |  Descrição          |   Responsabilidade  |
| -----------------   | -----------------   | -----------------   |
| Professores de manutenção | Administrador do Sistema. | - Receber solicitações
- Avaliar viabilidade
- Elaborar relatório de manutenção
- Resolver chamados
- Comunicar-se com alunos
- Comunicar-se com os clientes(usuários) |


| Nome                |  Descrição          |   Responsabilidade  |
| -----------------   | -----------------   | -----------------   |
| Professores de manutenção | Administrador do Sistema. | - Receber solicitações
- Avaliar viabilidade
- Elaborar relatório de manutenção
- Resolver chamados
- Comunicar-se com alunos
- Comunicar-se com os clientes(usuários) |


| Nome                |  Descrição          |   Responsabilidade  |
| -----------------   | -----------------   | -----------------   |
| Alunos(SUAP) | Usuários do sistema que possuem vínculo com o SUAP. Esses usuários fornecem máquinas que precisam de manutenção para a prática de ensino por meio de um chamado. | 
- Abrir pedido de manutenção
- Comunicar-se com professores
- Encerrar o chamado
- Acompanhar o chamado
- Avaliar o serviço
- Elaborar relatórios |

| Nome                |  Descrição          |   Responsabilidade  |
| -----------------   | -----------------   | -----------------   |
| Visitante | Pessoa que não possui cadastro no sistema. | 
- Visualizar serviços
- Possibilidade de doar |



## 4. Descrição do ambiente dos usuários



- O ambiente dos tipos de usuários variam de acordo com suas atribuições e necessidades.

- Os professores necessitam de um local que tenha computador com acesso a internet para acessar os recursos de gerenciamento de chamados e comunicação com clientes. Impressora também é necessária para algumas funcionalidades como impressão de etiquetas, ordem de serviço e relatórios.

- Os alunos necessitam apenas de um dispositivo móvel ou computador com acesso à internet para acessar os recursos disponíveis, não havendo carências ambientais específicas.
As tarefas e atividades no sistema duram poucos minutos e podem ser feitas a qualquer momento da semana, não  importando horário. 

## 5. Principais necessidades dos usuários

- Os alunos da disciplina de manutenção de computadores  muitas vezes carecem da prática profissional por falta de computadores, as pessoas também sentem falta de um serviço de manutenção de computadores confiável e de baixo custo.

- Nesse cenário visando ajudar tantos os alunos quanto as pessoas que precisam de manutenção confiável e com baixo custo nasce um projeto que visa conectar ambos.

- Um sistema que conecta pessoas que precisam desse serviço com professores de manutenção do IFRN, o sistema possibilita a abertura de um chamado para manutenção de computadores, sendo possível visualizar o perfil do Professor responsável, avaliar o serviço,  visualizar serviços já concluídos e a doação de materiais ou monetária. O professor responsável consegue gerenciar todas as funções do site.

## 6. Alternativas concorrentes

No projeto, podemos identificar dois tipos de concorrentes, empresas de prestação de serviços, como a Triider e NetSupport.

## 7. Visão geral do produto

Nosso produto é uma plataforma simplificada para gerenciamento de chamados de manutenção técnica, direcionada a professores de disciplinas de manutenção de computadores. Os alunos têm a oportunidade de resolver problemas reais de membros da comunidade escolar, como pais, alunos, professores e servidores, enriquecendo seu aprendizado prático e contribuindo para a resolução de questões tecnológicas na escola.  O sistema deve ser compatível com os navegadores mais usados no mercado.

-	Em última análise, é necessário um processo simplificado de login integrado ao SUAP. Isso garante uma entrada fácil e rápida para professores, alunos e demais membros da comunidade escolar. Com essa integração, proporcionamos que posteriormente, outros campus se juntem à plataforma, bem como garante que o público alvo deste produto será atingido.

-	Por fim, deve-se garantir uma identidade visual única através de uma logo marca que identifica nossa plataforma, permitindo que seus membros a utilizem para divulgação em eventos e outras atividades relacionadas.


## 8. Requisitos funcionais

| Código | Nome                           | Descrição                                                                                  |
|--------|--------------------------------|--------------------------------------------------------------------------------------------|
| RF01   | Fazer login                    | Acessar as funções da plataforma.                                                          |
| RF02   | Abrir chamado - Aluno         | Fazer um pedido no site para entregar um computador que precise de reparo a um professor. |
| RF03   | Aceitar chamado - Professor   | O professor visualiza os chamados dos usuários abertos e pode aceitá-los para reparo.       |
| RF04   | Encerrar chamado              | Fechamento de um chamado já aberto.                                                        |
| RF05   | Gerar relatórios - Professor  | Após o cumprimento do serviço, o professor deve abrir um relatório explicando o serviço.    |
| RF06   | Atualizar chamado - Professor & Aluno | Atualização dos dados de um chamado já aberto.                                       |
| RF07   | Gerar ordem de serviço - Professor | Criação de uma etiqueta relacionada à abertura do chamado, especificando problemas, datas e número de chamado. |
| RF08   | Avaliar serviço - Aluno        | Espaço para o aluno avaliar o serviço prestado pelo professor.                              |
| RF09   | Doar ao projeto - Aluno        | Espaço para fazer doações para ajudar a dar continuidade ao projeto.                         |
| RF10   | Gerenciar doações - Professor  | Espaço para o professor gerenciar as doações feitas para o projeto.                          |



## 9. Requisitos não-funcionais
| Código | Nome                        | Descrição                                                          | Categoria     | Classificação |
|--------|-----------------------------|--------------------------------------------------------------------|---------------|---------------|
| NF01   | Controle de acesso Usuário | Só usuários autenticados podem ter acesso ao sistema.             | Segurança     | Obrigatório   |
| NF02   | Usabilidade e navegabilidade | O sistema necessita ser intuitivo e de fácil usabilidade.        | Performance   | Obrigatório   |
| NF03   | Disponibilidade             | O sistema precisa ter disponibilidade para usuários acompanharem os chamados a qualquer momento. | Disponibilidade | Desejável  |
| NF04   | Log de dados                | Registrar Logs ao mudar status e outros aspectos de um chamado.    | Segurança     | Desejável     |
| NF05   | Autenticação via Suap       | Usar base de dados do SUAP para login para restringir o acesso à comunidade escolar. | Segurança     | Desejável     |
