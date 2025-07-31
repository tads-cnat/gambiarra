// eslint.config.mjs
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginSecurity from "eslint-plugin-security";

export default [
	// Ignorar pastas comuns
	{
		ignores: ["**/dist/**", "**/node_modules/**", "bin/**", "coverage/**" , "build/**", "public/**", "scripts/**", "test/**", "tests/**", "cypress/**", "e2e/**", "cypress.config.js", "cypress.config.ts", "cypress.config.mjs", "cypress.env.json", "cypress.env.js", "cypress.env.ts"],
	},

	// Configurações base
	eslint.configs.recommended,

	// TypeScript com análise de tipos
	...tseslint.configs.recommendedTypeChecked,

	// Regras para arquivos TS/TSX com suporte a tipos
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.json"],
			},
		},
		rules: {
			eqeqeq: "error",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/prefer-promise-reject-errors": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-misused-promises": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/await-thenable": "off",
			"@typescript-eslint/restrict-template-expressions": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-redundant-type-constituents": "off",
			"@typescript-eslint/no-deprecated": "warn",
		},
	},

	// Evitar analisar arquivos de configuração com regras TS
	{
		files: [".ncurc.cjs", "eslint.config.mjs"],
		rules: {},
	},

	// Regras sonarjs para detectar duplicações
	{
		plugins: {
			sonarjs,
			import: eslintPluginImport,
			security: eslintPluginSecurity,
		},
		rules: {
			"sonarjs/no-implicit-dependencies": "error",
			"sonarjs/no-duplicate-string": "error", // Strings duplicadas no código
			"sonarjs/no-identical-functions": "error", // Funções duplicadas
			"sonarjs/no-small-switch": "error", // Evita switches triviais
			"sonarjs/cognitive-complexity": ["error", 15], // Limita complexidade de funções
			"sonarjs/no-all-duplicated-branches": "error", // Branches duplicadas em if/switch
			"sonarjs/no-collapsible-if": "error", // Ifs que podem ser combinados
			"sonarjs/no-collection-size-mischeck": "error", // Verificações incorretas de tamanho
			"sonarjs/no-duplicated-branches": "error", // Branches duplicadas em geral
			"sonarjs/no-gratuitous-expressions": "error", // Expressões booleanas desnecessárias
			"sonarjs/no-inverted-boolean-check": "error", // Verificações invertidas confusas
			"sonarjs/no-nested-switch": "error", // Switch dentro de switch
			"sonarjs/no-redundant-boolean": "error", // Boolean redundante (ex: `!true`)
			"sonarjs/no-use-of-empty-return-value": "error", // Return vazio onde não faz sentido
			// 🚩 IMPORT RULES
			"import/no-extraneous-dependencies": "error", // Importações que não estão no package.json

			// 🚫 Evita usar child_process (exec, spawn) sem sanitização — previne Command Injection
			"security/detect-child-process": "error",

			// 🚫 Evita usar nomes de ficheiro dinâmicos no fs (readFile, writeFile) — previne Path Traversal
			"security/detect-non-literal-fs-filename": "error",

			// 🚫 Evita regex dinâmica sem validação — previne Regex Injection e ReDoS
			"security/detect-non-literal-regexp": "error",

			// 🚫 Evita usar eval(userInput) — previne Remote Code Execution
			"security/detect-eval-with-expression": "error",

			// 🚫 Evita usar pseudoRandomBytes ou Math.random() para tokens — previne geração de tokens fracos
			"security/detect-pseudoRandomBytes": "error",

			// 🚫 Bloqueia uso de new Buffer() — previne vulnerabilidades, pois é deprecated
			"security/detect-new-buffer": "error",

			// 🚫 Flag regex inseguras que podem travar o servidor (ReDoS)
			"security/detect-unsafe-regex": "error",

			// 🚫 Proíbe buffer.read com noAssert — pode causar comportamento indefinido
			"security/detect-buffer-noassert": "error",

			// 🚫 Evita require(userInput) — previne carregar módulos arbitrários
			"security/detect-non-literal-require": "error",

			// ⚠️ Avisa comparação insegura de tokens — para evitar Timing Attacks 
			"security/detect-possible-timing-attacks": "error",
		},
	},
];
