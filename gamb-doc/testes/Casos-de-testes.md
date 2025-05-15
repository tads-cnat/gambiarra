# Casos de Teste - Abrir Chamado

**Projeto:** Gambiarra  
**Versão:** 1.2  
**Data da Última Atualização:** 14/05  

## Histórico de Alterações

| Data   | Versão | Descrição                                    | Autor         | Github |
|--------|--------|----------------------------------------------|---------------|---------|
| 11/05  | 1.0    | Primeira escrita dos casos de teste          | Ryan          | [ryan-pin](https://github.com/ryan-pin)   |
| 13/05  | 1.1    | Adição caso de teste Login                   | Luiz Gustavo  | [1Lgr](https://github.com/1Lgr)   |
| 13/05  | 1.2    | Atualização do caso de teste Abrir chamado  | Igor          | [igor1208gabriel](https://github.com/Igor1208gabriel) |
| 14/05  | 1.2    | Escrita dos testes funcionais de Avaliar Chamado | Livia     | [liviaaVS](https://github.com/liviaaVS)    |
| 14/05  | 1.2    | Escrita dos testes Encerrar Chamado | Leonardo     | [leveau10](https://github.com/leveau10)    |


---

## Conteúdo

1. [Introdução](#introdução)  
2. [Testes Funcionais](#testes-funcionais)  


---

## Introdução

Este documento especifica os testes que devem ser realizados para o caso de uso **Abrir Chamado**, **Fazer login**, **Avaliar Chamado** e **Encerrar Chamado** incluindo preparação do ambiente, dados de entrada e resultados esperados.

### Visão Geral do Documento

Além desta seção introdutória, o documento está organizado em:

- **Seção 2**: Testes funcionais para o fluxo principal e cenários alternativos.
- **Seção 3**: Testes não funcionais.
- **Seção 4**: Referências.

---

## 1.0 Testes Funcionais

### 1.1 - Caso de Teste: Abrir Chamado

**Pré-requisitos:**  
Usuário deve estar logado como cliente.

**Passos para execução:**

1. Acesse a dashboard logado como cliente.  
2. Clique no botão "Abrir Chamado".  
3. Preencha o modal com os seguintes campos:
   - **Título do chamado** (obrigatório)
   - **Descrição do problema** (obrigatório)
   - **Modelo do item** (obrigatório)
   - **Adicionar acessórios** (opcional)

**Informações dos Campos:**

- Exceto "Acessórios", todos os campos são obrigatórios.
- Campos aceitam até 255 caracteres alfanuméricos.

**Critérios de Aceitação:**

- Informações preenchidas devem ser exibidas corretamente na tela de detalhamento.

---

### 1.2 - Caso de Teste: Login

**Pré-requisitos:**  
Usuário não autenticado.
Existir um usuário com as credencias usuário: "professor1" e senha: "ZAP123!!"

**Passos para execução:**

1. Clique no botão "Login" na tela inicial.  
2. Preencha os campos:
   - **Usuário** (obrigatório)
   - **Senha** (obrigatório)

**Critérios de Aceitação:**

- O sistema exibe a mensagem "Login realizado com sucesso!".
- Usuário é redirecionado para a dashboard após login bem-sucedido.

---

### 1.3 - Caso de Teste: Avaliar Chamado

**Pré-requisitos:**  
Usuário deve estar logado como cliente. Chamado deve estar em status "Fechado", "Fechado sem Resolução" ou "Arquivado".

**Passos para execução:**

1. Acesse a tela de detalhamento do chamado.  
2. Clique em "Avaliar Chamado".  
3. Preencha os campos:
   - **Nota** (obrigatório, de 1 a 5)
   - **Comentário** (opcional, até 255 caracteres)

**Critérios de Aceitação:**

- As informações preenchidas devem aparecer corretamente na tela de detalhamento.

---

### 1.4 - Caso de Teste: Encerrar Chamado

**Pré-requisitos:**  
O usuário deve estar logado como professor, pois apenas professores têm permissão para fechar chamados.

**Passos para execução:**

1. Acesse a tela de listagem de chamados, logado como professor.  
2. Clique no botão **"Encerrar Chamado"**.  
3. Um modal será exibido com o seguinte campo:
   - **(entrada 1)** Status de encerramento do chamado (obrigatório)
   - **(entrada 2)** Justificativa do encerramento do chamado (obrigatório)

**Informações dos Campos:**

- O chamado precisa estar em um dos status: “Em diagnóstico”, “Aguardando Peça” ou “Equipamento em conserto”.
- Os status de encerramento são: "Resolvido" ou "Fechado sem Resolução".
- O campo de justificativa é obrigatório.  
- O campo de justificativa aceita caracteres alfanuméricos com limite de até 255 caracteres.

**Critérios de Aceitação:**

- Após o encerramento do chamado, o status é alterado para “Resolvido” ou “Fechado sem resolução”, a depender do status anterior.  
- O professor é redirecionado para a tela de detalhes do chamado.

---

## 2. Testes Funcionais

### 2.1 - Fluxo Principal: Abrir Chamado

| Título              | Descrição                 | Modelo        | Acessório          | Resultado Esperado                    |
|---------------------|---------------------------|---------------|--------------------|---------------------------------------|
| Computador quebrado | notebook não está ligando | notebook dell | carregador         | Chamado criado com sucesso            |
| Computador quebrado | notebook não está ligando | notebook dell |                    | Chamado criado com sucesso            |
|                     | notebook não está ligando | notebook dell | carregador         | Erro: "O título é obrigatório"        |
| Computador quebrado |                           | notebook dell | carregador         | Erro: "A descrição é obrigatória"     |
| Computador quebrado | notebook não está ligando |               | carregador         | Erro: "O modelo é obrigatório"     |
|                     |                           |               |                    | Erro: Mensagens informando que os campos são obrigatórios     |
| Computador quebrado | notebook não está ligando | notebook dell | [>255 caracteres]  | Erro: "O acessório pode conter no máximo 255 caracteres"     |
| Computador quebrado | [>255 caracteres]         | notebook dell | carregador         | Erro: "A descrição pode conter no máximo 255 caracteres"     |
| [>50 caracteres]   | notebook não está ligando | notebook dell | carregador         | Erro: "O título pode conter no máximo 50 caracteres"     |
| Computador quebrado | notebook não está ligando | [>255 caracteres] | carregador     | Erro: "O modelo pode conter no máximo 255 caracteres"     |
| [>50 caracteres]   | [>255 caracteres]         | [>255 caracteres] | [>255 caracteres] | Erro: Mensagens informando que os campos execdem o limite e caracteres   |

---

### 2.2 - Fluxo Principal: Fazer Login

| Usuário         | Senha          | Resultado Esperado                      |
|-----------------|----------------|-----------------------------------------|
| professor1         | ZAP123!!         | Login realizado com sucesso             |
|                 | ZAP123!!           | Erro: "Usuário é obrigatório"           |
| professor1         |                | Erro: "Senha é obrigatória"             |
|                 |                | Erro: "Usuário é obrigatório", "Senha é obrigatória" |
| professor_errado       | senha_errada       | Erro: "Credenciais Inválidas"          |
| professor1         | senha_errada       | Erro: "Credenciais Inválidas"          |
| professor_errado       | ZAP123!!         | Erro: "Credenciais Inválidas"          |

---

### 2.3 - Fluxo Principal: Avaliar Chamado

| Nota | Comentário                        | Resultado Esperado              |
|------|----------------------------------|---------------------------------|
| 4    | ótimo atendimento                | Avaliação cadastrada com sucesso |
| 5    |                                  | Avaliação cadastrada com sucesso |
|      | Atendimento péssimo...           | Erro ao cadastrar avaliação     |
| 5    | [texto > 255 caracteres]         | Erro ao cadastrar avaliação     |

---

### 2.4 - Fluxo Principal: Encerrar Chamado

|   Status Inicial  |   Status Final  | Justificativa              | Resultado Esperado                     | Resultado Obtido | Situação |
|------------|---------------------------|----------------------------|----------------------------------------|------------------|----------|
|       Equipamento em conserto | Resolvido                 | Entre 1 e 255 caracteres   | Mensagem de “Encerrado com sucesso”    |                  |          |
|        Equipamento em conserto    |        Equipamento em conserto       | Mais de 255 caracteres     | Erro - Justificativa         |                  |          |
|     Equipamento em conserto    |     Equipamento em conserto  | Menos de 1 caracter     | Erro - Justificativa      |                  |          |
|        Aceito                   |   Aceito   | Mais de 255 caracteres    | Erro - Status  não permitido     |                  |          |
|        Fechado sem resolução    |     Fechado sem resolução    | Entre 1 e 255 caracteres     | Erro - Status não permitido                 |                  |          |
|        Resolvido          |        Resolvido             | Mais de 255 caracteres     | Erro - Status não permitido                   |                  |          |
|        Recusado          |        Recusado              | Mais de 255 caracteres     | Erro - Status não permitido                   |                |          |
|        Em diagnóstico      |     Fechado sem resolução  | Mais de 255 caracteres     | Mensagem de “Encerrado com sucesso”            |                  |          |
|        Equipamento em conserto     |        Equipamento em conserto |     | Erro - Justificativa obrigatória                  |                  |          |
---

