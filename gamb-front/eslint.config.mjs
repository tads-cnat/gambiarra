// eslint.config.mjs
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	// Ignorar pastas comuns
	{
		ignores: ["**/dist/**", "**/node_modules/**", "bin/**", "coverage/**"],
	},

	// Configurações base
	eslint.configs.recommended,

	// TypeScript com análise de tipos
	...tseslint.configs.recommendedTypeChecked,

	// Estilo opcional (pode remover se não quiser)
	...tseslint.configs.stylistic,

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

			"@typescript-eslint/no-deprecated": "warn",
		},
	},

	// Evitar analisar arquivos de configuração com regras TS
	{
		files: [".ncurc.cjs", "eslint.config.mjs"],
		rules: {},
	},
];
