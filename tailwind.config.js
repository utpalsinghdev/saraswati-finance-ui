/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "old-brick": {
                    '50': '#eff7ff',
                    '100': '#dcecfd',
                    '200': '#c1defc',
                    '300': '#96cafa',
                    '400': '#64adf6',
                    '500': '#3b8af1',
                    '600': '#2a6fe6',
                    '700': '#225ad3',
                    '800': '#2249ab',
                    '900': '#214187',
                    '950': '#192952'
                },
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};