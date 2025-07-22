describe("Teste com fixture", () => {

  before(() => {
    // limpa o cache do navegador antes de cada teste
    cy.clearCookies();
    cy.clearLocalStorage();
    // Carrega os dados do fixture
    cy.fixture("responseLogin").as("userData");
    cy.visit("/login");
  });

  it("Preencher credenciais incorretas de login", () => {
    cy.get("input[name='username']").type(
      "trufa");
    cy.get("input[name='password']").type("trufa123");
  });
  it("Clicar no botão de login", function () {
    cy.get("button[type='submit']").click();
  });
});
