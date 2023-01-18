/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				biobg: {
					"0%": { backgroundPosition: "0% 0%" },
					"100%": { backgroundPosition: "30% 50%" },
				},
			},
			animation: {
				biobg: "biobg 1600ms ease-in-out forwards",
			},
			backgroundImage: {
				"bio-gradient": "linear-gradient(115deg,#ffffff 35%,#2b2b2b 35%)",
			},
		},
	},
	plugins: [],
};
