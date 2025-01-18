Aqui estão as regras de negócio que você forneceu, adaptadas ao modelo solicitado:

# Regras de Negócio
[Voltar a documentação](../documentacao.md)

## Histórico de Revisões

| Data       | Versão | Descrição                  | Autor                          |
|------------|--------|----------------------------|--------------------------------|
| 20/10/2024 | 1.0.0  | Regras de negócio          | Livia Vitória da Silva         |

### O que uma regra de negócio precisa ter?

- **ID da Regra:** Um identificador único para cada regra.
- **Descrição da Regra:** Uma breve descrição da regra de negócio.
- **Condição:** A condição que deve ser atendida para que a regra seja aplicada.
- **Ação:** A ação a ser tomada se a condição for atendida.
- **Observações (opcional):** Notas adicionais ou considerações sobre a regra.

| **ID da Regra** | **Descrição da Regra**                                      | **Condição**                                  | **Ação**                                               | **Observações**                                   |
|------------------|-----------------------------------------------------------|-----------------------------------------------|--------------------------------------------------------|--------------------------------------------------|
| 001              | Somente <code style="background-color: #1E1E1E; color: red;">clientes</code> cadastrados na plataforma poderão abrir chamados. | Usuário não está cadastrado                    | Impedir a abertura do chamado e exibir mensagem de erro. | Aplicável a todos os tipos de clientes.          |
| 002              | Somente <code style="background-color: #1E1E1E; color: red;">professores</code> poderão modificar o status do chamado para encerrá-lo. | Usuário não é um professor                     | Bloquear a modificação do status do chamado.           | Verificar o tipo de usuário antes da ação.       |
| 003              | Apenas um <code style="background-color: #1E1E1E; color: red;">professor</code> logado pode gerar uma ordem de serviço. | Usuário não é um professor ou não está logado | Impedir a geração da ordem de serviço e notificar.     | Necessário que o professor esteja autenticado.    |
| 004              | Um <code style="background-color: #1E1E1E; color: red;">professor</code> ou um <code style="background-color: #1E1E1E; color: red;">cliente</code> logado pode gerar um termo de responsabilidade. | Usuário não é professor ou cliente logado      | Bloquear a geração do termo de responsabilidade.       | Verificar o tipo de usuário antes da ação.       |
| 005              | Professores podem criar relatórios com base nos chamados abertos no sistema. | Usuário não é um professor                     | Impedir a criação do relatório e exibir mensagem de erro. | Os relatórios incluirão informações sobre o número do chamado e os procedimentos solicitados. |
