/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightblue:"#E3FDFD",
        lightblue2:"#CBF1F5",
        blue:"#A6E3E9",
        darkblue:"#71C9CE",
        extradarkblue:"#6439FF"

      },
    },
  },
  plugins: [],
};
