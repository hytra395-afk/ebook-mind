import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'gradient-aurora': 'linear-gradient(135deg, rgb(99 102 241) 0%, rgb(139 92 246) 50%, rgb(217 70 239) 100%)',
        'gradient-aurora-radial': 'radial-gradient(ellipse at top, rgb(99 102 241 / 0.3), rgb(139 92 246 / 0.2), transparent 70%)',
        'gradient-miami': 'linear-gradient(135deg, rgb(45 212 191) 0%, rgb(34 211 238) 50%, rgb(163 230 53) 100%)',
        'gradient-sunset': 'linear-gradient(135deg, rgb(251 146 60) 0%, rgb(244 63 94) 50%, rgb(236 72 153) 100%)',
        'gradient-aurora-text': 'linear-gradient(to right, rgb(99 102 241), rgb(139 92 246), rgb(217 70 239))',
        'gradient-miami-text': 'linear-gradient(to right, rgb(45 212 191), rgb(34 211 238), rgb(163 230 53))',
        'gradient-sunset-text': 'linear-gradient(to right, rgb(251 146 60), rgb(244 63 94), rgb(236 72 153))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "gradient-xy": {
          "0%, 100%": { 
            backgroundPosition: "0% 0%",
            backgroundSize: "200% 200%"
          },
          "50%": { 
            backgroundPosition: "100% 100%",
            backgroundSize: "200% 200%"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "gradient-xy": "gradient-xy 10s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
