# Regras de Negócio

[Voltar à documentação](../documentacao.md)

## Histórico de Revisões

| Data       | Versão | Descrição         | Autor                  |
|------------|--------|-------------------|------------------------|
| 20/10/2024 | 1.0.0  | Regras de negócio | Livia Vitória da Silva |
| 23/04/2025 | 1.0.1  | Regras de negócio | Livia Vitória da Silva |

---

### O que uma regra de negócio precisa ter?

- **ID da Regra**: Um identificador único para cada regra.
- **Descrição da Regra**: Uma breve descrição da regra de negócio.
- **Condição**: A condição que deve ser atendida para que a regra seja aplicada.
- **Ação**: A ação a ser tomada se a condição for atendida.
- **Observações (opcional)**: Notas adicionais ou considerações sobre a regra.

---

## Lista de Regras de Negócio

| ID da Regra | Descrição da Regra                                                                                              | Condição                                                        | Ação                                                      | Observações                                      |
|-------------|------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|-----------------------------------------------------------|--------------------------------------------------|
| <a id="rn001"></a>RN001 | Somente **clientes** cadastrados na plataforma poderão abrir chamados.                                          | Usuário não está cadastrado                                     | Impedir a abertura do chamado e exibir mensagem de erro. | Aplicável a todos os tipos de clientes.         |
| <a id="rn002"></a>RN002 | Somente **professores** poderão modificar o status do chamado para encerrá-lo.                                 | Usuário não é um professor                                      | Bloquear a modificação do status do chamado.             | Verificar o tipo de usuário antes da ação.       |
| <a id="rn003"></a>RN003 | Apenas um **professor** pode gerar uma ordem de serviço.                                                        | Usuário não é um professor ou não está logado                   | Impedir a geração da ordem de serviço e notificar.       | Necessário que o professor esteja autenticado.   |
| <a id="rn004"></a>RN004 | Um **professor** ou **cliente** pode gerar um termo de responsabilidade.                                        | Usuário não é professor ou cliente logado                       | Bloquear a geração do termo de responsabilidade.         | Verificar o tipo de usuário antes da ação.       |
| <a id="rn005"></a>RN005 | Professores e gerentes podem criar relatórios com base nos chamados abertos.                                   | Usuário não é um professor                                      | Impedir a criação do relatório e exibir mensagem de erro.| Relatórios incluem número e procedimentos.       |
| <a id="rn006"></a>RN006 | Somente **clientes** podem abrir chamados.                                                                      | Usuário não é um cliente                                        | Esconder o botão para o usuário.                         | Aplicável a todos os tipos de clientes.          |
| <a id="rn007"></a>RN007 | O **cliente** só pode visualizar os chamados que ele mesmo abriu.                                               | Acessar chamados de outros clientes                             | Impedir a visualização.                                 | Aplicável a todos os tipos de clientes.          |
| <a id="rn008"></a>RN008 | O **bolsista** só pode visualizar os chamados atribuídos a ele ou que ele mesmo abriu.                          | Acessar chamados não atribuídos/abertos por ele                 | Impedir a visualização.                                 | Aplicável a todos os bolsistas.                  |
| <a id="rn009"></a>RN009 | Somente o **gerente** pode visualizar os chamados abertos por todos os clientes.                               | Usuário não é um gerente                                        | Impedir a visualização de outros chamados.               | Aplicável apenas ao gerente.                     |
| <a id="rn010"></a>RN010 | Somente o **professor** pode atribuir um chamado a um bolsista.                                                 | Usuário não é um professor                                      | Bloquear a atribuição e exibir erro.                    | Verificar tipo de usuário antes da ação.         |
| <a id="rn011"></a>RN011 | Somente o **gerente** pode mudar o papel de um usuário.                                                         | Usuário não é um gerente                                        | Bloquear mudança de papel e exibir erro.                | Verificar tipo de usuário antes da ação.         |
| <a id="rn012"></a>RN012 | Um **cliente externo** não pode ser atribuído como professor ou bolsista.                                       | Usuário é cliente externo                                       | Impedir atribuição e exibir erro.                       | Verificar tipo de cliente antes da ação.         |
| <a id="rn013"></a>RN013 | Somente um **cliente interno do tipo aluno** pode ser um bolsista.                                              | Usuário não é um aluno interno                                  | Impedir atribuição como bolsista.                       | Verificar tipo de cliente antes da ação.         |
| <a id="rn014"></a>RN014 | Somente um **cliente interno do tipo servidor** pode ser um professor.                                          | Usuário não é servidor interno                                  | Impedir atribuição como professor.                      | Verificar tipo de cliente antes da ação.         |
