/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				background: {
					DEFAULT: '#181F2A', // fundo escuro
					light: '#F3F6FB', // fundo claro
				},
				card: {
					DEFAULT: '#232B3A', // card escuro
					light: '#FFFFFF', // card claro
				},
				primary: {
					DEFAULT: '#5A8DFB', // azul NexKontrol
					dark: '#3B82F6', // azul botão
				},
				text: {
					DEFAULT: '#FFFFFF', // texto principal
					secondary: '#A0AEC0', // texto secundário
					dark: '#181F2A', // texto em fundo claro
				},
			},
		},
	},
	plugins: [],
}
