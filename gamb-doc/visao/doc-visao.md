# Documento de Visão
[Voltar a documentação](../documentacao.md)
## Histórico de Revisões

| Data       | Versão | Descrição                  | Autor                          |
|------------|--------|----------------------------|--------------------------------|
| 22/10/2024 | 2.0.0  | Reformulação do projeto    | Todos os integrantes da equipe |
| 15/05/2025 | 3.0.0  | Reformulação do projeto    | Livia Vitória da Silva         |
|------------|--------|----------------------------|--------------------------------|


## 1. Objetivo do projeto

Desenvolver um sistema web para o gerenciamento de chamados de manutenção técnica, destinado a oferecer suporte aos professores responsáveis pela manutenção de computadores no IFRN-CNAT. Este sistema permitirá que alunos das disciplinas de manutenção atuem como bolsistas, resolvendo tarefas atribuídas pelos professores dentro de chamados específicos.

O projeto fundamenta-se nos pilares de ensino, pesquisa e extensão, com especial ênfase na integração curricular na etapa final do curso. Além de facilitar a gestão eficiente dos chamados, o sistema promove uma cultura de excelência técnica e profissionalismo, alinhando-se aos objetivos educacionais e institucionais do IFRN-CNAT.

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
| Professores de manutenção | Administrador do Sistema. | <ul> <li>Receber solicitações</li><li>Avaliar viabilidade</li><li>Elaborar relatório de manutenção</li><li> Resolver chamados</li><li>Encerrar chamado</li> <li>Aceitar chamado</li><li> Comunicar-se com os clientes(usuários)</li> |

| Nome                |  Descrição          |   Responsabilidade  |
| -----------------   | -----------------   | -----------------   |
| Cliente | Usuários do cadastrados no sistema. Esses usuários fornecem máquinas que precisam de manutenção para a prática de ensino por meio de um chamado. | <ul><li> Abrir chamado de manutenção</li><li> Comunicar-se com professores</li><li> Acompanhar o chamado</li><li> Avaliar o serviço</li> </ul>|


| Nome                |  Descrição          |   Responsabilidade  |
| -----------------   | -----------------   | -----------------   |
| Visitante | Pessoa que não possui cadastro no sistema. | <ul> <li>Visualizar serviços oferecidos</li> <li>Possibilidade de doar ao projeto</li><li>Vizualizar feedbacks</li></ul>|



## 4. Descrição do ambiente dos usuários


- O ambiente dos tipos de usuários variam de acordo com suas atribuições e necessidades.

- Os professores necessitam de um local que tenha computador com acesso a internet para acessar os recursos de gerenciamento de chamados e comunicação com clientes. Impressora também é necessária para algumas funcionalidades como impressão de etiquetas, ordem de serviço e relatórios.

- Os Clientes necessitam apenas de um dispositivo móvel ou computador com acesso à internet para acessar os recursos disponíveis, não havendo carências ambientais específicas.
As tarefas e atividades no sistema duram poucos minutos e podem ser feitas a qualquer momento da semana, não  importando horário. 

## 5. Principais necessidades dos usuários

- Os alunos da disciplina de manutenção de computadores  muitas vezes carecem da prática profissional por falta de computadores, as pessoas também sentem falta de um serviço de manutenção de computadores confiável e de baixo custo.

- Nesse cenário visando ajudar tantos os alunos quanto as pessoas que precisam de manutenção confiável e com baixo custo nasce um projeto que visa conectar ambos.

- Um sistema que conecta pessoas que precisam desse serviço com professores de manutenção do IFRN-CNAT, o sistema possibilita a abertura de um chamado para manutenção de computadores, sendo possível visualizar o perfil do Professor responsável, avaliar o serviço,  visualizar serviços já concluídos. O professor responsável consegue gerenciar todas as funções do site.

- Além disso, bolsistas que trabalharem dentro dos chamados terão suas atividades registradas no sistema, permitindo um acompanhamento mais eficaz do aprendizado e da experiência prática adquirida. Cada bolsista poderá visualizar suas tarefas, horas trabalhadas e receber feedback dos professores, contribuindo para seu desenvolvimento profissional. 

## 6. Alternativas concorrentes

No projeto, podemos identificar dois tipos de concorrentes, empresas de prestação de serviços, como a Triider e NetSupport.

## 7. Visão geral do produto

Nosso produto é uma plataforma focada em gerenciamento de chamados de manutenção técnica e, gerenciamento de atividades e contribuições dos bolsistas nos chamados solicitados, direcionada a professores de disciplinas de manutenção de computadores do IFRN - CNAT. Os alunos têm a oportunidade de resolver problemas reais de membros da comunidade escolar, como pais, outros alunos, professores e servidores, enriquecendo seu aprendizado prático e contribuindo para a resolução de questões tecnológicas na escola.  O sistema deve ser compatível com os navegadores mais usados no mercado.

-	Em última análise, é desejável um processo simplificado de login integrado ao SUAP. Isso garante uma entrada fácil e rápida para professores, alunos e demais membros da comunidade escolar. Com essa integração, proporcionamos que posteriormente, outros campus se juntem à plataforma. Bem como, garante que o público alvo deste produto será atingido.

-	Por fim, deve-se garantir uma identidade visual única através de uma logo marca que identifica nossa plataforma, permitindo que seus membros a utilizem para divulgação em eventos e outras atividades relacionadas.


## 8. Requisitos funcionais

#### <span style="color: blue; font-size: 20px">#</span> [REGRAS DE NEGÓGIO](../regras/regras-de-negocio.md)

| Código | Nome                                 | Descrição                                                                                                                                                           | Regras de Negócio     |
|--------|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|
| RF01   | Abertura de chamados                 | O sistema deve disponibilizar um formulário para registrar um equipamento que precisa de reparo.                                                                  | <a href="/gamb-doc/regras/regras-de-negocio.md#rn001">RN001</a>, <a href="/doc/regras/regras-de-negocio.md#rn006">RN006</a> |
| RF02   | Análise de chamados                | O sistema deve possibilitar a aceitação ou a recusa de um chamado "em análise".                                                                                                             |                        |
| RF03   | Encerramento de chamados             | O sistema deve possibilitar o fechamento de um chamado já aberto.                                                                                                  | <a href="/gamb-doc/regras/regras-de-negocio.md#rn002">RN002</a> |
| RF04   | Detalhamento de chamados             | O sistema deve possibilitar o detalhamento do chamado.                                                                                                             |                        |
| RF05   | Alteração de status dos chamados     | O sistema deve possibilitar alterações no status do chamado aberto.                                                                                                | <a href="/gamb-doc/regras/regras-de-negocio.md#rn002">RN002</a> |
| RF06   | Avaliação de chamados                | O sistema deve possibilitar o registro de uma avaliação do chamado.                                                                                                |                        |
| RF07   | Listagem de chamados                 | O sistema deve possuir listas com os chamados.                                                                                                                     | <a href="/gamb-doc/regras/regras-de-negocio.md#rn007">RN007</a>, <a href="/doc/regras/regras-de-negocio.md#rn008">RN008</a>, <a href="/doc/regras/regras-de-negocio.md#rn009">RN009</a> |
| RF08   | Gerenciamento de usuários            | O sistema deve possibilitar adicionar e remover professores e bolsistas da plataforma.                                                                             | <a href="/gamb-doc/regras/regras-de-negocio.md#rn011">RN011</a>, <a href="/doc/regras/regras-de-negocio.md#rn012">RN012</a>, <a href="/doc/regras/regras-de-negocio.md#rn013">RN013</a>, <a href="/doc/regras/regras-de-negocio.md#rn014">RN014</a> |
| RF09   | Atribuição de bolsistas              | O sistema deve possibilitar atribuir ou remover bolsistas de um chamado.                                                                                           | <a href="/gamb-doc/regras/regras-de-negocio.md#rn010">RN010</a>, <a href="/doc/regras/regras-de-negocio.md#rn013">RN013</a> |
| RF10   | Envio de mensagens                   | O sistema deve possibilitar o envio de mensagens entre os participantes do chamado.                                                                                |                        |
| RF11   | Geração de ordem de serviço          | O sistema deve possibilitar a criação de uma etiqueta com informações de um chamado.                                                                               | <a href="/gamb-doc/regras/regras-de-negocio.md#rn003">RN003</a> |
| RF12   | Login no sistema                     | O sistema deve disponibilizar autenticação para os seus usuários.                                                                                                  |                        |
| RF13   | Geração de estatísticas dos chamados | O sistema deve permitir a geração de relatórios em PDF com dados agrupados dos chamados, como quantidade por status, por período e por responsável.               | <a href="/gamb-doc/regras/regras-de-negocio.md#rn005">RN005</a> |
| RF14   | Gerenciamento de atividades          | O sistema deve permitir que bolsistas visualizem e gerenciem as atividades atribuídas a eles, marcando andamento e conclusão. Professores acompanham o progresso. | <a href="/gamb-doc/regras/regras-de-negocio.md#rn008">RN008</a>, <a href="/doc/regras/regras-de-negocio.md#rn010">RN010</a> |
| RF15   | Cadastramento de usuários          | O sistema deve permitir que os visitantes se cadastrem na plataforma para acessar as funções do sistema. | <a href="/gamb-doc/regras/regras-de-negocio.md#rn008">RN015</a> |

## 9. Requisitos não-funcionais
| Código | Nome                        | Descrição                                                          | Categoria     | Classificação |
|--------|-----------------------------|--------------------------------------------------------------------|---------------|---------------|
| NF01   | Controle de acesso Usuário | Apenas usuários autenticados podem ter acesso ao sistema.             | Segurança     | Obrigatório   |
| NF02   | Usabilidade e navegabilidade | O sistema necessita ser intuitivo e de fácil usabilidade.        | Performance   | Obrigatório   |
| NF03   | Disponibilidade             | O sistema necessita ter disponibilidade para usuários acompanharem os chamados a qualquer momento. | Disponibilidade | Desejável  |
| NF04   | Auditoria de Logs                | Registrar Logs ao mudar status e outros aspectos de um chamado.    | Segurança     | Desejável     |
| NF05   | Autenticação via Suap       | Usar base de dados do SUAP para login para restringir o acesso à comunidade escolar. | Segurança     | Desejável     |


