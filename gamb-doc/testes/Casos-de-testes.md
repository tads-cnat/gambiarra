# Casos de Teste - Abrir Chamado

**Projeto:** Gambiarra  
**Versão:** 1.1  
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

## Testes Funcionais

### 1.0 - Caso de Teste: Abrir Chamado

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

### 1.1 - Caso de Teste: Login

**Pré-requisitos:**  
Usuário não autenticado.

**Passos para execução:**

1. Clique no botão "Login" na tela inicial.  
2. Preencha os campos:
   - **Usuário** (obrigatório)
   - **Senha** (obrigatório)

**Critérios de Aceitação:**

- Usuário é redirecionado para a dashboard após login bem-sucedido.

---

### 1.2 - Caso de Teste: Avaliar Chamado

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

## 2. Testes Funcionais

### 2.1 - Fluxo Principal: Abrir Chamado

### 2.1 - Fluxo Principal: Abrir Chamado

| Título              | Descrição                 | Modelo        | Acessório         | Resultado Esperado        |
|---------------------|---------------------------|---------------|--------------------|----------------------------|
| Computador quebrado | notebook não está ligando | notebook dell | carregador         | Chamado criado com sucesso|
| Computador quebrado | notebook não está ligando | notebook dell |                    | Chamado criado com sucesso|
|                     | notebook não está ligando | notebook dell | carregador         | Erro ao criar chamado     |
| Computador quebrado |                           | notebook dell | carregador         | Erro ao criar chamado     |
| Computador quebrado | notebook não está ligando |               | carregador         | Erro ao criar chamado     |
|                     |                           |               |                    | Erro ao criar chamado     |
| Computador quebrado | notebook não está ligando | notebook dell | [>255 caracteres]  | Erro ao criar chamado     |
| Computador quebrado | [>255 caracteres]         | notebook dell | carregador         | Erro ao criar chamado     |
| [>50 caracteres]   | notebook não está ligando | notebook dell | carregador         | Erro ao criar chamado     |
| Computador quebrado | notebook não está ligando | [>255 caracteres] | carregador     | Erro ao criar chamado     |
| [>50 caracteres]   | [>255 caracteres]         | [>255 caracteres] | [>255 caracteres] | Erro ao criar chamado     |

*(Outros testes incluem entradas com mais de 255 caracteres, campos vazios, etc.)*

---

### 2.2 - Fluxo Principal: Avaliar Chamado

| Nota | Comentário                        | Resultado Esperado              |
|------|----------------------------------|---------------------------------|
| 4    | ótimo atendimento                | Avaliação cadastrada com sucesso |
| 5    |                                  | Avaliação cadastrada com sucesso |
|      | Atendimento péssimo...           | Erro ao cadastrar avaliação     |
| 5    | [texto > 255 caracteres]         | Erro ao cadastrar avaliação     |

---

### 2.3 - Fluxo Principal: Fazer Login

| Usuário         | Senha          | Resultado Esperado                      |
|-----------------|----------------|-----------------------------------------|
| correto         | correta         | Login realizado com sucesso             |
|                 | senha           | Erro: "Usuário é obrigatório"           |
| usuário         |                | Erro: "Senha é obrigatória"             |
|                 |                | Erro: "Usuário é obrigatório", "Senha é obrigatória" |
| incorreto       | incorreta       | Erro: "Credenciais Inválidas"          |
| correto         | incorreta       | Erro: "Credenciais Inválidas"          |
| incorreto       | correta         | Erro: "Credenciais Inválidas"          |

---



