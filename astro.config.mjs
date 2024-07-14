import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Swagger Docs",
      customCss: [
        // Path to your Tailwind base styles:
        // "@fontsource/monda",
        // "@fontsource-variable/open-sans",
        // "@fontsource/roboto",
        "./src/tailwind.css",
        "./src/styles/custom.css",
      ],
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        {
          label: "SwaggerHub",
          link: "https://support.smartbear.com/swaggerhub/docs/?lang=en&_ga=2.60681774.2026413304.1711629066-1405927530.1692968928&_gac=1.120446330.1710339688.Cj0KCQjwncWvBhD_ARIsAEb2HW_RZZphNpeARZhDRQWA4Ii4eNXuem_2gPRrlSS-Izy1vUE-xr0wemMaAsJDEALw_wcB.html",
        },
        {
          label: "Open Source Tools",
          items: [
            {
              label: "Swagger Editor",
              link: "open-source-tools/swagger-editor/",
            },
            {
              label: "Swagger Editor Next",
              link: "open-source-tools/swagger-editor-next/",
            },
            {
              label: "Swagger UI",
              items: [
                {
                  label: "Usage",
                  items: [
                    {
                      label: "Instalation",
                      link: "open-source-tools/swagger-ui/usage/installation/",
                    },
                    {
                      label: "Configuration",
                      link: "open-source-tools/swagger-ui/usage/configuration/",
                    },
                    {
                      label: "CORS",
                      link: "open-source-tools/swagger-ui/usage/cors/",
                    },
                    {
                      label: "OAuth 2.0",
                      link: "open-source-tools/swagger-ui/usage/oauth2/",
                    },
                    {
                      label: "Deep Linking",
                      link: "open-source-tools/swagger-ui/usage/deep-linking/",
                    },
                    {
                      label: "Limitations",
                      link: "open-source-tools/swagger-ui/usage/limitations/",
                    },
                    {
                      label: "Version detection",
                      link: "open-source-tools/swagger-ui/usage/version-detection/",
                    },
                  ],
                  collapsed: true,
                },
                {
                  label: "Customization",
                  items: [
                    {
                      label: "Overview",
                      link: "open-source-tools/swagger-ui/customization/overview/",
                    },
                    {
                      label: "Plugin API",
                      link: "open-source-tools/swagger-ui/customization/plugin-api/",
                    },
                    {
                      label: "Plug points",
                      link: "open-source-tools/swagger-ui/customization/plug-points/",
                    },
                    {
                      label: "Custom layout",
                      link: "open-source-tools/swagger-ui/customization/custom-layout/",
                    },
                  ],
                  collapsed: true,
                },
                {
                  label: "Development",
                  items: [
                    {
                      label: "Setting up",
                      link: "open-source-tools/swagger-ui/development/setting-up/",
                    },
                    {
                      label: "Scripts",
                      link: "open-source-tools/swagger-ui/development/scripts/",
                    },
                  ],
                  collapsed: true,
                },
              ],
              collapsed: true,
            },
            {
              label: "Swagger Codegen",
              link: "open-source-tools/swagger-codegen/",
            },
          ],
          collapsed: true,
        },
        {
          label: "OpenAPI Guide",
          items: [
            {
              label: "What Is OpenAPI?",
              link: "specification/about/",
            },
            {
              label: "Basic Structure",
              link: "specification/basic-structure/",
            },
            {
              label: "API Server and Base Path",
              link: "specification/api-host-and-base-path/",
            },
            {
              label: "Media Types",
              link: "specification/media-types/",
            },
            {
              label: "Paths and Operations",
              link: "specification/paths-and-operations/",
            },
            {
              label: "Describing Parameters",
              link: "specification/describing-parameters/",
            },
            {
              label: "Parameter Serialization",
              link: "specification/serialization/",
            },
            {
              label: "Describing Request Body",
              items: [
                {
                  label: "Describing Request Body",
                  link: "specification/describing-request-body/describing-request-body",
                },
                {
                  label: "File Upload",
                  link: "specification/describing-request-body/file-upload/",
                },
                {
                  label: "Multipart Requests",
                  link: "specification/describing-request-body/multipart-requests/",
                },
              ],
              collapsed: true,
            },
            {
              label: "Describing Responses",
              link: "specification/describing-responses/",
            },
            {
              label: "Data Models",
              items: [
                {
                  label: "Data Models (Schemas)",
                  link: "specification/data-models/data-models/",
                },
                {
                  label: "Data Types",
                  link: "specification/data-models/data-types/",
                },
                {
                  label: "Enums",
                  link: "specification/data-models/enums/",
                },
                {
                  label: "Dictionaries, Hashmaps, Associative Arrays",
                  link: "/specification/data-models/dictionaries/",
                },
                {
                  label: "oneOf, anyOf, allOf, not",
                  link: "specification/data-models/oneof-anyof-allof-not/",
                },
                {
                  label: "Inheritance and Polymorphism",
                  link: "specification/data-models/inheritance-and-polymorphism/",
                },
                {
                  label: "Representing XML",
                  link: "specification/data-models/representing-xml/",
                },
                {
                  label: "Supported JSON Schema Keywords",
                  link: "specification/data-models/keywords/",
                },
              ],
              collapsed: true,
            },
            {
              label: "Adding Examples",
              link: "specification/adding-examples/",
            },
            {
              label: "Authentication",
              items: [
                {
                  label: "Authentication and Authorization",
                  link: "specification/authentication/",
                },
                {
                  label: "Basic Authentication",
                  link: "specification/authentication/basic-authentication/",
                },
                {
                  label: "API Keys",
                  link: "specification/authentication/api-keys/",
                },
                {
                  label: "Bearer Authentication",
                  link: "specification/authentication/bearer-authentication/",
                },
                {
                  label: "OAuth 2.0",
                  link: "specification/authentication/oauth2/",
                },
                {
                  label: "OpenID Connect Discovery",
                  link: "specification/authentication/openid-connect-discovery/",
                },
                {
                  label: "Cookie Authentication",
                  link: "specification/authentication/cookie-authentication/",
                },
              ],
              collapsed: true,
            },
            {
              label: "Links",
              link: "specification/links/",
            },
            {
              label: "Callbacks",
              link: "specification/callbacks/",
            },
            {
              label: "Components Section",
              link: "specification/components/",
            },
            {
              label: "Using $ref",
              link: "specification/using-ref/",
            },
            {
              label: "API General Info",
              link: "specification/api-general-info/",
            },
            {
              label: "Grouping Operations With Tags",
              link: "specification/grouping-operations-with-tags/",
            },
            {
              label: "OpenAPI Extensions",
              link: "specification/openapi-extensions/",
            },
            {
              label: "2.0",
              items: [
                {
                  label: "What is Swagger",
                  link: "specification/20/what-is-swagger/",
                },
                {
                  label: "Basic Structure",
                  link: "specification/20/basic-structure/",
                },
                {
                  label: "API Host and Base Path",
                  link: "specification/20/api-host-and-base-path/",
                },
                {
                  label: "MIME Types",
                  link: "specification/20/mime-types/",
                },
                {
                  label: "Paths and Operations",
                  link: "specification/20/paths-and-operations/",
                },
                {
                  label: "Describing Parameters",
                  link: "specification/20/describing-parameters/",
                },
                {
                  label: "Describing Request Body",
                  link: "specification/20/describing-request-body/",
                },
                {
                  label: "File Upload",
                  link: "specification/20/file-upload/",
                },
                {
                  label: "Describing Responses",
                  link: "specification/20/describing-responses/",
                },
                {
                  label: "Authentication",
                  items: [
                    {
                      label: "Authentication",
                      link: "specification/20/authentication/authentication/",
                    },
                    {
                      label: "API Keys",
                      link: "specification/20/authentication/api-keys/",
                    },
                    {
                      label: "Basic Authentication",
                      link: "specification/20/authentication/basic-authentication/",
                    },
                  ],
                  collapsed: true,
                },
                {
                  label: "Adding Examples",
                  link: "specification/20/adding-examples/",
                },
                {
                  label: "Enums",
                  link: "specification/20/enums/",
                },
                {
                  label: "Grouping Operations With Tags",
                  link: "specification/20/grouping-operations-with-tags/",
                },
                {
                  label: "Swagger Extensions",
                  link: "specification/20/swagger-extensions/",
                },
              ],
              collapsed: true,
            },
          ],
          collapsed: true,
        },
      ],
      components: {
        Header: "./src/components/Header.astro",
        Select: "./src/components/Select.astro",
        ThemeSelect: "./src/components/ThemeSelect.astro",
        MobileMenuToggle: "./src/components/MobileMenuToggle.astro",
      },
      expressiveCode: {
        defaultProps: {
          wrap: true,
        },
        themes: ["dracula", "github-light"],
        plugins: [pluginLineNumbers()],
      },
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
  ],
});
