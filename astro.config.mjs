import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Swagger Docs",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      customCss: [
        // Path to Tailwind base styles:
        "./src/tailwind.css",
      ],
      sidebar: [
        {
          label: "SwaggerHub",
          link: "https://support.smartbear.com/swaggerhub/docs/?lang=en&_ga=2.60681774.2026413304.1711629066-1405927530.1692968928&_gac=1.120446330.1710339688.Cj0KCQjwncWvBhD_ARIsAEb2HW_RZZphNpeARZhDRQWA4Ii4eNXuem_2gPRrlSS-Izy1vUE-xr0wemMaAsJDEALw_wcB.html",
        },
        {
          label: "Open Source Tools",
          autogenerate: {
            directory: "open-source-tools",
          },
          collapsed: true,
        },
        {
          label: "OpenAPI Guide",
          autogenerate: {
            directory: "specification",
          },
          collapsed: true,
        },
      ],
      // components: {
      // 	// Override the default `SocialIcons` component.
      // 	Header: './src/components/header.astro',
      // },
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
  ],
});
