import starlightPlugin from '@astrojs/starlight-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [starlightPlugin()],
	theme: {
		colors: {
			'primary': 'hsl(117, 57%, 46%)',
			'primary-dark': 'hsl(127, 55.19%, 35.88%)',
			'white': 'hsl(0, 0%, 100%)',
			'black': 'hsl(0, 0%, 0%)',
		},
		extend: {},
	},
	corePlugins: {
		preflight: false,
	},
}
