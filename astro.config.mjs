import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import sitemap from "@astrojs/sitemap";

// Set base path depending on the branch (main branch gets "/docs/", others have no base path)
const basePath = process.env.CF_PAGES_BRANCH === 'main' ? '/docs/' : '/' || '/';

// https://astro.build/config
export default defineConfig({
  site: "https://swagger.io",
  base: basePath,
  trailingSlash: 'ignore',
  integrations: [starlight({
    title: "Swagger Docs",
    customCss: [
    // Path to your Tailwind base styles:
    "./src/tailwind.css", "./src/styles/fonts.css", "./src/styles/custom.css"],
    social: {
      github: "https://github.com/withastro/starlight"
    },
    sidebar: [{
      label: "SwaggerHub",
      link: "https://support.smartbear.com/swaggerhub/docs/",
      attrs: {
        target: '_blank'
      }
    }, {
      label: "SwaggerHub Explore",
      link: "https://support.smartbear.com/swaggerhub-explore/docs/",
      attrs: {
        target: '_blank'
      }
    }, {
      label: "Open Source Tools",
      items: [{
        label: "Swagger Editor",
        link: "open-source-tools/swagger-editor/"
      }, {
        label: "Swagger Editor Next",
        link: "open-source-tools/swagger-editor-next/"
      }, {
        label: "Swagger UI",
        items: [{
          label: "Usage",
          items: [{
            label: "Swagger UI Installation",
            link: "open-source-tools/swagger-ui/usage/installation/"
          }, {
            label: "Configuration",
            link: "open-source-tools/swagger-ui/usage/configuration/"
          }, {
            label: "CORS",
            link: "open-source-tools/swagger-ui/usage/cors/"
          }, {
            label: "OAuth 2.0",
            link: "open-source-tools/swagger-ui/usage/oauth2/"
          }, {
            label: "Deep Linking",
            link: "open-source-tools/swagger-ui/usage/deep-linking/"
          }, {
            label: "Limitations",
            link: "open-source-tools/swagger-ui/usage/limitations/"
          }, {
            label: "Version detection",
            link: "open-source-tools/swagger-ui/usage/version-detection/"
          }],
          collapsed: true
        }, {
          label: "Customization",
          items: [{
            label: "Overview",
            link: "open-source-tools/swagger-ui/customization/overview/"
          }, {
            label: "Plugin API",
            link: "open-source-tools/swagger-ui/customization/plugin-api/"
          }, {
            label: "Plug points",
            link: "open-source-tools/swagger-ui/customization/plug-points/"
          }, {
            label: "Custom layout",
            link: "open-source-tools/swagger-ui/customization/custom-layout/"
          }],
          collapsed: true
        }, {
          label: "Development",
          items: [{
            label: "Setting up",
            link: "open-source-tools/swagger-ui/development/setting-up/"
          }, {
            label: "Scripts",
            link: "open-source-tools/swagger-ui/development/scripts/"
          }],
          collapsed: true
        }],
        collapsed: true
      }, {
        label: "Swagger Codegen",
        link: "open-source-tools/swagger-codegen/"
      }],
      collapsed: true
    }, {
      label: "OpenAPI Guide",
      items: [{
        label: "Version 3.0",
        items: [{
          label: "What Is OpenAPI?",
          link: "specification/v3_0/about/"
        }, {
          label: "Basic Structure",
          link: "specification/v3_0/basic-structure/"
        }, {
          label: "API Server and Base Path",
          link: "specification/v3_0/api-host-and-base-path/"
        }, {
          label: "Media Types",
          link: "specification/v3_0/media-types/"
        }, {
          label: "Paths and Operations",
          link: "specification/v3_0/paths-and-operations/"
        }, {
          label: "Describing Parameters",
          link: "specification/v3_0/describing-parameters/"
        }, {
          label: "Parameter Serialization",
          link: "specification/v3_0/serialization/"
        }, {
          label: "Describing Request Body",
          items: [{
            label: "Overview",
            link: "specification/v3_0/describing-request-body/describing-request-body"
          }, {
            label: "File Upload",
            link: "specification/v3_0/describing-request-body/file-upload/"
          }, {
            label: "Multipart Requests",
            link: "specification/v3_0/describing-request-body/multipart-requests/"
          }],
          collapsed: true
        }, {
          label: "Describing Responses",
          link: "specification/v3_0/describing-responses/"
        }, {
          label: "Data Models",
          items: [{
            label: "Overview",
            link: "specification/v3_0/data-models/data-models/"
          }, {
            label: "Data Types",
            link: "specification/v3_0/data-models/data-types/"
          }, {
            label: "Enums",
            link: "specification/v3_0/data-models/enums/"
          }, {
            label: "Dictionaries, Hashmaps, Associative Arrays",
            link: "/specification/v3_0/data-models/dictionaries/"
          }, {
            label: "oneOf, anyOf, allOf, not",
            link: "specification/v3_0/data-models/oneof-anyof-allof-not/"
          }, {
            label: "Inheritance and Polymorphism",
            link: "specification/v3_0/data-models/inheritance-and-polymorphism/"
          }, {
            label: "Representing XML",
            link: "specification/v3_0/data-models/representing-xml/"
          }, {
            label: "Supported JSON Schema Keywords",
            link: "specification/v3_0/data-models/keywords/"
          }],
          collapsed: true
        }, {
          label: "Adding Examples",
          link: "specification/v3_0/adding-examples/"
        }, {
          label: "Authentication",
          items: [{
            label: "Overview",
            link: "specification/v3_0/authentication/"
          }, {
            label: "Basic Authentication",
            link: "specification/v3_0/authentication/basic-authentication/"
          }, {
            label: "API Keys",
            link: "specification/v3_0/authentication/api-keys/"
          }, {
            label: "Bearer Authentication",
            link: "specification/v3_0/authentication/bearer-authentication/"
          }, {
            label: "OAuth 2.0",
            link: "specification/v3_0/authentication/oauth2/"
          }, {
            label: "OpenID Connect Discovery",
            link: "specification/v3_0/authentication/openid-connect-discovery/"
          }, {
            label: "Cookie Authentication",
            link: "specification/v3_0/authentication/cookie-authentication/"
          }],
          collapsed: true
        }, {
          label: "Links",
          link: "specification/v3_0/links/"
        }, {
          label: "Callbacks",
          link: "specification/v3_0/callbacks/"
        }, {
          label: "Components Section",
          link: "specification/v3_0/components/"
        }, {
          label: "Using $ref",
          link: "specification/v3_0/using-ref/"
        }, {
          label: "API General Info",
          link: "specification/v3_0/api-general-info/"
        }, {
          label: "Grouping Operations With Tags",
          link: "specification/v3_0/grouping-operations-with-tags/"
        }, {
          label: "OpenAPI Extensions",
          link: "specification/v3_0/openapi-extensions/"
        }],
        collapsed: true
      }, {
        label: "Version 2.0",
        items: [{
          label: "What is Swagger",
          link: "specification/v2_0/what-is-swagger/"
        }, {
          label: "Basic Structure",
          link: "specification/v2_0/basic-structure/"
        }, {
          label: "API Host and Base Path",
          link: "specification/v2_0/api-host-and-base-path/"
        }, {
          label: "MIME Types",
          link: "specification/v2_0/mime-types/"
        }, {
          label: "Paths and Operations",
          link: "specification/v2_0/paths-and-operations/"
        }, {
          label: "Describing Parameters",
          link: "specification/v2_0/describing-parameters/"
        }, {
          label: "Describing Request Body",
          link: "specification/v2_0/describing-request-body/"
        }, {
          label: "File Upload",
          link: "specification/v2_0/file-upload/"
        }, {
          label: "Describing Responses",
          link: "specification/v2_0/describing-responses/"
        }, {
          label: "Authentication",
          items: [{
            label: "Overview",
            link: "specification/v2_0/authentication/authentication/"
          }, {
            label: "API Keys",
            link: "specification/v2_0/authentication/api-keys/"
          }, {
            label: "Basic Authentication",
            link: "specification/v2_0/authentication/basic-authentication/"
          }],
          collapsed: true
        }, {
          label: "Adding Examples",
          link: "specification/v2_0/adding-examples/"
        }, {
          label: "Enums",
          link: "specification/v2_0/enums/"
        }, {
          label: "Grouping Operations With Tags",
          link: "specification/v2_0/grouping-operations-with-tags/"
        }, {
          label: "Swagger Extensions",
          link: "specification/v2_0/swagger-extensions/"
        }],
        collapsed: true
      }],
      collapsed: true
    }],
    components: {
      Header: "./src/components/Header.astro",
      PageFrame: "./src/components/PageFrame.astro",
      Select: "./src/components/Select.astro",
      ThemeSelect: "./src/components/ThemeSelect.astro",
      MobileMenuToggle: "./src/components/MobileMenuToggle.astro"
    },
    expressiveCode: {
      defaultProps: {
        wrap: true
      },
      themes: ["dracula", "github-light"],
      plugins: [pluginLineNumbers()]
    },
    editLink: {
      baseUrl: 'https://github.com/swagger-api/swagger.io/tree/stage'
    },
    favicon: 'favicon.svg'
  }), tailwind({
    // Disable the default base styles:
    applyBaseStyles: false
  }), sitemap()], 
});