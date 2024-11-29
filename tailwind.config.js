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
                white: {
                    DEFAULT: "#fdfdfd",
                    pure: "#ffffff"
                },
                black: {
                    DEFAULT: "#202020",
                    pure: "#000000"
                },
                primary: {
                    DEFAULT: "#003366",
                    dark: "#002952"
                },
                secondary: {
                    DEFAULT: "#fed233",
                    dark: "#f9c800"
                }
            },
            width: {
                desktop: "1365px",
                mobile: "100vw"
            }
        },
    },
    plugins: []
}

