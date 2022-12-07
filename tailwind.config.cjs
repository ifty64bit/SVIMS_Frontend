/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
    theme: {
        extend: {
            colors: {
                myGray: '#18283A',
                myRed: '#CC0000',
                myWhite: '#F6F4F3',
                myIndigo: '#9F15F4',
                myYellow: '#F0B905'
            }
        },
    },
    plugins: [],
};
