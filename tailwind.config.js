/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0ea5e9", // Sky 500
                secondary: "#8b5cf6", // Violet 500
                dark: "#0f172a", // Slate 900
            },
            fontFamily: {
                sans: ['Inter Variable', 'sans-serif'],
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInScale: {
                    '0%': { opacity: '0', transform: 'scale(0.94)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'fade-in-scale': 'fadeInScale 0.8s ease-out 0.2s forwards',
            }
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [],
}
