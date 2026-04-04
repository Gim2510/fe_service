// tailwind.config.js
export default {
    darkMode: 'class', // ⬅️ abilita il toggle manuale
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                wave: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(20deg)' },
                    '50%': { transform: 'rotate(-10deg)' },
                    '75%': { transform: 'rotate(20deg)' },
                },
            },
            animation: {
                wave: 'wave 1.5s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}