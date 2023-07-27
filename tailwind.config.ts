import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
    require("@tailwindcss/forms"),
  ],
} satisfies Config;
