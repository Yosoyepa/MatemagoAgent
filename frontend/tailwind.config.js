/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Paleta MateMago - Identidad Visual Oficial
        matemago: {
          primary: "#706fd3",     // Morado Suave - Brand principal
          accent: "#ff7e5f",      // Coral Vibrante - CTAs
          success: "#2ecc71",     // Verde Esmeralda - Feedback positivo
          error: "#e74c3c",       // Rojo Alizarin - Feedback negativo
          background: "#f4f6f8",  // Gris muy claro - Fondo principal
          card: "#ffffff",        // Blanco puro - Fondo tarjetas
          text: "#3d3d3d",        // Gris oscuro suave - Texto principal
        },
        // Sistema de colores base
        border: "#e2e8f0",
        input: "#f9fafb",
        ring: "#706fd3",
        background: "#f4f6f8",
        foreground: "#3d3d3d",
        primary: {
          DEFAULT: "#706fd3",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#3d3d3d",
        },
        destructive: {
          DEFAULT: "#e74c3c",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        accent: {
          DEFAULT: "#ff7e5f",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#3d3d3d",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#3d3d3d",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
      },
      fontFamily: {
        sans: [
          "ui-rounded",
          '"Hiragino Maru Gothic ProN"',
          "Quicksand",
          "Comfortaa",
          "Manjari",
          '"Arial Rounded MT"',
          '"Arial Rounded MT Bold"',
          "Calibri",
          "source-sans-pro",
          "sans-serif",
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.2)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(-25%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        bounce: "bounce 1s infinite",
      },
      boxShadow: {
        'matemago': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'matemago-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
