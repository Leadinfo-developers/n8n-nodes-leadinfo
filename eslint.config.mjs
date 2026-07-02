import n8nNodesBase from 'eslint-plugin-n8n-nodes-base';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: ['dist'],
	},
	{
		files: ['**/*.ts'],
		extends: [...tseslint.configs.recommended],
	},
	{
		files: ['package.json'],
		plugins: { 'n8n-nodes-base': n8nNodesBase },
		rules: {
			...n8nNodesBase.configs.community.rules,
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				extraFileExtensions: ['.json'],
			},
		},
	},
	{
		files: ['./credentials/**/*.ts'],
		plugins: { 'n8n-nodes-base': n8nNodesBase },
		rules: {
			...n8nNodesBase.configs.credentials.rules,
			'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
			'n8n-nodes-base/cred-class-field-type-options-password-missing': 'off',
		},
	},
	{
		files: ['./nodes/**/*.ts'],
		plugins: { 'n8n-nodes-base': n8nNodesBase },
		rules: {
			...n8nNodesBase.configs.nodes.rules,
			'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',
			'n8n-nodes-base/node-class-description-outputs-wrong': 'off',
			'n8n-nodes-base/node-param-type-options-max-value-present': 'off',
		},
	},
);
