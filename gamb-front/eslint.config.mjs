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
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/no-misused-promises": "off",
			"@typescript-eslint/await-thenable": "off",
			"@typescript-eslint/restrict-template-expressions": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-redundant-type-constituents": "off",
			"@typescript-eslint/no-deprecated": "error",
		},
	},

	// Evitar analisar arquivos de configuração com regras TS
	{
		files: [".ncurc.cjs", "eslint.config.mjs"],
		rules: {},
	},
];
