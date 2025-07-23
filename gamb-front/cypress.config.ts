// Importa a função defineConfig do Cypress
import { defineConfig } from "cypress";
import { loadEnv } from "vite";

const env = loadEnv(process.cwd(), "");

// Exporta a configuração principal do Cypress
export default defineConfig({
	e2e: {
		// URL base da aplicação que será testada
		// se estou previzualizando o build a porta é a 4173 caso contrário é a 5173
		baseUrl: env.VITE_PORT 
			? `http://localhost:${env.VITE_PORT}` :  `http://localhost:5173`,

		// Largura da tela do browser durante os testes
		viewportWidth: 1280,

		// Altura da tela do browser durante os testes
		viewportHeight: 936,

		// Define se cada teste corre isolado (false permite partilhar estado entre testes)
		testIsolation: false,

		// Número de tentativas ao correr testes em modo interativo (cypress open)
		// retries: { openMode: 2 },
	},

	env: {
		// Variável de ambiente para definir o URL base da API
		API_BASE_URL: "http://localhost:8000/api/v1",
	},
});
