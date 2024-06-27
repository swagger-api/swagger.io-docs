import starlightPlugin from '@astrojs/starlight-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [starlightPlugin()],
	theme: {
		colors: {
			'swagger': '#85EA2D',
			'swagger-dark': '#5bd621',
			'clr-neutral-1': '#FFFFFF',
			'clr-neutral-2': '#F8FAFB',
			'clr-neutral-3': '#F0F3F5',
			'clr-neutral-4': '#E4EAF1',
			'clr-neutral-5': '#DEE5ED',
			'clr-neutral-6': '#D8DDE4',
			'clr-neutral-7': '#C7D7E2',
			'clr-neutral-8': '#AFC4CE',
			'clr-neutral-9': '#8EADBF',
			'clr-neutral-10': '#7E96A5',
			'clr-neutral-11': '#566D7A',
			'clr-neutral-12': '#3B505B',
			'clr-neutral-13': '#173647',
			'clr-neutral-14': '#212529',
			'clr-accent-1': '#20B1FD',
			'clr-accent-2': '#097EB2',
			'clr-accent-3': '#00537C',
			'clr-accent-4': '#173647',
			'clr-accent-5': '#112838',
			'white': '#ffffff',
			'black': '#000000',
		},
		fontFamily: {
			'roboto': ['Roboto', 'sans-serif'],
			'monda': ['Monda', 'sans-serif'],
		},
		screens: {
			xs: '360px',
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			'2xl': '1440px',
		},
		extend: {},
	},
	corePlugins: {
		preflight: false,
	}
}