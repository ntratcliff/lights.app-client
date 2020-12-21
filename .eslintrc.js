module.exports = {
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [
		'plugin:vue/recommended',
		'standard'
	],
	plugins: [
		'vue'
	],
	rules: {
		// enforce tabs over spaces, as tabs make code more accessible :)
		"no-tabs": 0,
		"indent": ["error", "tab"],
		"vue/html-indent": ["error","tab"]
	}
}
