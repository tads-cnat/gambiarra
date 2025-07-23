describe("Teste com fixture", () => {
	before(function () {
		// Limpa cookies e localStorage antes de cada teste
		cy.clearCookies();
		cy.clearLocalStorage();

		
	});

	beforeEach(function () {
		// Visita sempre antes de cada teste
		cy.visit("/login");
    // Carrega os dados do fixture
		cy.fixture("credenciais").as("userData");
    
	});

	it("Deve exibir mensagem de erro com credenciais inválidas", function () {
    cy.intercept("POST", "/api/v1/auth/login", {
			statusCode: 401,
		}).as("loginRequest");

		cy.get("input[name='username']").type(this.userData.username);
		cy.get("input[name='password']").type(this.userData.password);
		cy.get("button[type='submit']").click();

		cy.get("[data-cypress='error-messageLogin']")
			.should("be.visible")
		
	});

	
});
