# Documento de Visão

## Histórico de Revisões

| Data       | Versão | Descrição                  | Autor                          |
|------------|--------|----------------------------|--------------------------------|
| 27/02/2024 | 1.0.0    | Início da documentação     | Todos os integrantes da equipe |
| 13/03/2024 | 1.1.0    | Finalizada primeira versão | Todos os integrantes da equipe |
| 15/03/2024 | 1.1.1   | <ul> <li> Correção do Objetivo do Projeto</li> <li> Atualização do nome de usuário de "Aluno" para "Cliente" </li> <li> Atualização do nome de usuário de "Doadores" para "Visitantes" </li></ul> | Livia Vitória da Silva |
| 19/03/2024 | 1.1.2    | Regras de negócio | Livia Vitória da Silva |
| 30/08/2024 | 1.1.3    | Regras de negócio | Livia Vitória da Silva |


## 1. Objetivo do projeto


Desenvolver um sistema web para gerenciamento de chamados de manutenção técnica visa oferecer suporte aos professores de manutenção de computadores do IFRN-CNAT, incentivando boas práticas profissionais. O projeto se baseia nos pilares de ensino, pesquisa e extensão, com um foco especial na integração curricular da última etapa. Este sistema não apenas facilita a gestão eficiente dos chamados de manutenção, mas também contribui para a promoção de uma cultura de excelência técnica e profissionalismo, alinhada com os objetivos educacionais e institucionais do IFRN-CNAT.

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

- Um sistema que conecta pessoas que precisam desse serviço com professores de manutenção do IFRN-CNAT, o sistema possibilita a abertura de um chamado para manutenção de computadores, sendo possível visualizar o perfil do Professor responsável, avaliar o serviço,  visualizar serviços já concluídos e a doação de materiais ou monetária. O professor responsável consegue gerenciar todas as funções do site.

## 6. Alternativas concorrentes

No projeto, podemos identificar dois tipos de concorrentes, empresas de prestação de serviços, como a Triider e NetSupport.

## 7. Visão geral do produto

Nosso produto é uma plataforma simplificada para gerenciamento de chamados de manutenção técnica, direcionada a professores de disciplinas de manutenção de computadores do IFRN - CNAT. Os alunos têm a oportunidade de resolver problemas reais de membros da comunidade escolar, como pais, outros alunos, professores e servidores, enriquecendo seu aprendizado prático e contribuindo para a resolução de questões tecnológicas na escola.  O sistema deve ser compatível com os navegadores mais usados no mercado.

-	Em última análise, é desejável um processo simplificado de login integrado ao SUAP. Isso garante uma entrada fácil e rápida para professores, alunos e demais membros da comunidade escolar. Com essa integração, proporcionamos que posteriormente, outros campus se juntem à plataforma. Bem como, garante que o público alvo deste produto será atingido.

-	Por fim, deve-se garantir uma identidade visual única através de uma logo marca que identifica nossa plataforma, permitindo que seus membros a utilizem para divulgação em eventos e outras atividades relacionadas.


## 8. Requisitos funcionais

| Código | Nome                           | Descrição                                                                                  |
|--------|--------------------------------|--------------------------------------------------------------------------------------------|
| RF01   | Fazer login                    | Acessar as funções da plataforma.                                                          |
| RF02   | Abrir chamado - Cliente         | Fazer um pedido no site para entregar um computador que precise de reparo a um professor. |
| RF03   | Aceitar chamado - Professor   | O professor visualiza os chamados dos usuários abertos e pode aceitá-los para reparo.       |
| RF04   | Encerrar chamado  - Professor     | Fechamento de um chamado já aberto.                                                        |
| RF05   | Gerar relatórios - Professor  | Após o cumprimento do serviço, o professor deve abrir um relatório explicando o serviço.    |
| RF06   | Atualizar chamado - Professor & Cliente | Atualização dos dados de um chamado já aberto.                                       |
| RF07   | Gerar ordem de serviço - Professor | Criação de uma etiqueta relacionada à abertura do chamado, especificando problemas, datas e número de chamado. |
| RF08   | Avaliar serviço - Cliente        | Espaço para o aluno avaliar o serviço prestado pelo professor.                              |
| RF09   | Efetuar doação - Cliente & Visitante  | Espaço para fazer doações para ajudar a dar continuidade ao projeto.                         |
| RF10   | Gerenciar doações - Professor  | Espaço para o professor disponibilizar seu email para gerenciar as doações feitas para o projeto.                          |



## 9. Requisitos não-funcionais
| Código | Nome                        | Descrição                                                          | Categoria     | Classificação |
|--------|-----------------------------|--------------------------------------------------------------------|---------------|---------------|
| NF01   | Controle de acesso Usuário | Só usuários autenticados podem ter acesso ao sistema.             | Segurança     | Obrigatório   |
| NF02   | Usabilidade e navegabilidade | O sistema necessita ser intuitivo e de fácil usabilidade.        | Performance   | Obrigatório   |
| NF03   | Disponibilidade             | O sistema precisa ter disponibilidade para usuários acompanharem os chamados a qualquer momento. | Disponibilidade | Desejável  |
| NF04   | Log de dados                | Registrar Logs ao mudar status e outros aspectos de um chamado.    | Segurança     | Desejável     |
| NF05   | Autenticação via Suap       | Usar base de dados do SUAP para login para restringir o acesso à comunidade escolar. | Segurança     | Desejável     |


## <span style="color: red">#</span> REGRAS DE NEGÓGIO


<blockquote style="border-left: 5px solid red; padding-left: 10px;  background-color: rgba(255, 87, 127, 0)">
<p><b>Abertura de chamados</b></p>
<li>Somente <code style="background-color: #1E1E1E; color: red;">clientes</code>
cadastrados na plataforma poderão abrir chamados.</li>
</blockquote>


<blockquote style="border-left: 5px solid red; padding-left: 10px;  background-color: rgba(255, 87, 127, 0)">
<p><b>Encerrar chamados</b></p>
<li>Somente <code style="background-color: #1E1E1E; color: red;">Professores</code> poderam modificar o status do chamado para encerrá-lo.</li>
</blockquote>

<blockquote style="border-left: 5px solid red; padding-left: 10px;  background-color: rgba(255, 87, 127, 0)">
<p><b>Efetuar doação</b></p>
<li>A contribuição pode ser efetuada tanto por <code style="background-color: #1E1E1E; color: red;">clientes</code> registrados quanto por visitantes que proponham a doação através do email disponibilizado pelo professor.</li>
</blockquote>

<blockquote style="border-left: 5px solid red; padding-left: 10px; background-color: rgba(255, 87, 127, 0) ">
<p><b>Gerar relatórios</b></p>
<li>Gerar ordem de serviço: Apenas um <code style="background-color: #1E1E1E; color: red;">professor</code> logado pode gerar uma ordem de serviço</li>
<li>Imprimir termo de responsabilidade:
Um <code style="background-color: #1E1E1E; color: red;">professor</code> ou <code style="background-color: #1E1E1E; color: red;">cliente</code> logados podem gerar um termo de responsabilidade</li>
<li>Imprimir relatórios de chamados <i>(Em análise, fechados e aceitos)</i>:
Essa funcionalidade possibilita aos <code style="background-color: #1E1E1E; color: red;">professores</code> criar relatórios com base nos chamados abertos no sistema. Os relatórios apresentam informações sobre o número do chamado e os procedimentos solicitados nele.</li>
</blockquote>



