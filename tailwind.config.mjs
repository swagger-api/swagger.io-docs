import starlightPlugin from "@astrojs/starlight-tailwind";
import colors from "tailwindcss/colors";

// Generated color palettes
const accent = {
  200: "#b0d5a5",
  600: "#318000",
  900: "#133d00",
  950: "#0d2c02",
};
const gray = {
  100: "#f6f6f6",
  200: "#eeeeee",
  300: "#c2c2c2",
  400: "#8b8b8b",
  500: "#585858",
  700: "#383838",
  800: "#272727",
  900: "#181818",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: { accent, gray },
      fontFamily: {
        // Your preferred text font. Starlight uses a system font stack by default.
        sans: ['"Atkinson Hyperlegible"'],
        // Your preferred code font. Starlight uses system monospace fonts by default.
        mono: ['"IBM Plex Mono"'],
      },
    },
  },
  plugins: [starlightPlugin()],
};
