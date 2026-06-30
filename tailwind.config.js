import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        stealth: {
          black: "#0A0A0A",
          deep: "#060606",
        },
        tactical: {
          red: "#FF1A1A",
          redDim: "rgba(255, 26, 26, 0.12)",
          redMid: "rgba(255, 26, 26, 0.35)",
        },
        ember: {
          glow: "#FF4444",
          glowDim: "rgba(255, 68, 68, 0.14)",
        },
        industrial: {
          silver: "#B0B0B0",
          ash: "#7A7A7A",
          panel: "#111111",
          panelGlass: "rgba(17, 17, 17, 0.78)",
          panelDeep: "#080808",
          line: "#1E1E1E",
        },
      },
      fontFamily: {
        display: ["Orbitron", ...defaultTheme.fontFamily.sans],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", "IBM Plex Mono", ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        tactical: "0 0 24px rgba(255, 26, 26, 0.3)",
        ember: "0 0 32px rgba(255, 68, 68, 0.2)",
      },
      backgroundImage: {
        "scan-grid":
          "linear-gradient(rgba(255,26,26,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,26,26,0.025) 1px, transparent 1px)",
      },
      letterSpacing: {
        tactical: "0.08em",
      },
    },
  },
  plugins: [],
};
