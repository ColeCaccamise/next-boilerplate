import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	safelist: [
		'bg-error-fill',
		'bg-success-fill',
		'bg-warning-fill',
		'text-error',
		'text-success',
		'text-warning',
		'border-error-stroke-weak',
		'border-success-stroke-weak',
		'border-warning-stroke-weak',
	],
	theme: {
		extend: {
			colors: {
				brand: 'var(--brand)',
				'brand-stroke-strong': 'var(--brand-stroke-strong)',
				'brand-stroke-weak': 'var(--brand-stroke-weak)',
				'brand-fill': 'var(--brand-fill)',
				'typography-strong': 'var(--typography-strong)',
				'typography-weak': 'var(--typography-weak)',
				white: 'var(--white)',
				background: 'var(--background)',
				fill: 'var(--fill)',
				hover: 'var(--hover)',
				'fill-solid': 'var(--fill-solid)',
				'stroke-strong': 'var(--stroke-strong)',
				'stroke-medium': 'var(--stroke-medium)',
				'stroke-weak': 'var(--stroke-weak)',
				success: 'var(--success)',
				'success-stroke-strong': 'var(--success-stroke-strong)',
				'success-stroke-weak': 'var(--success-stroke-weak)',
				'success-fill': 'var(--success-fill)',
				error: 'var(--error)',
				'error-stroke-strong': 'var(--error-stroke-strong)',
				'error-stroke-weak': 'var(--error-stroke-weak)',
				'error-fill': 'var(--error-fill)',
				warning: 'var(--warning)',
				'warning-stroke-strong': 'var(--warning-stroke-strong)',
				'warning-stroke-weak': 'var(--warning-stroke-weak)',
				'warning-fill': 'var(--warning-fill)',
			},
		},
	},
	plugins: [],
};
export default config;
