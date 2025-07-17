// eslint.config.mjs
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";
import eslintPluginImport from "eslint-plugin-import";

export default [
	// Ignorar pastas comuns
	{
		ignores: ["**/dist/**", "**/node_modules/**", "bin/**", "coverage/**"],
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
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/prefer-promise-reject-errors": "warn",
			"@typescript-eslint/no-unsafe-argument": "warn",
			"@typescript-eslint/no-unsafe-call": "warn",
			"@typescript-eslint/no-unsafe-member-access": "warn",
			"@typescript-eslint/no-unsafe-return": "warn",
			"@typescript-eslint/no-unsafe-call": "warn",
			"@typescript-eslint/no-unsafe-assignment": "warn",
			"@typescript-eslint/no-unsafe-argument": "warn",
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/await-thenable": "warn",
			"@typescript-eslint/restrict-template-expressions": "warn",
			"@typescript-eslint/no-empty-object-type": "warn",
			"@typescript-eslint/no-redundant-type-constituents": "warn",
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
			  import: eslintPluginImport
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
		},
	},
];
