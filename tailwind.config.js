/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/view/**/*.{html,js,php}",

          // Checking for class reference in JS/TS files that could be in these folders
        "./resources/**/*.{html,js,php}",
        "./assets/**/*.{html,js,php}"
    ],
    theme: {
        extend: {
            colors: {
                white: "#fdfdfd",
                black: "#202020",
                primary: {
                    DEFAULT: "#003366",
                    dark: "#002952"
                },
                secondary: {
                    DEFAULT: "#fed233",
                    dark: "#000000"  // Undefined for now
                }
            }
        },
    },
    plugins: []
}

