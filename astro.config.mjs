import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Swagger Docs',
    customCss: [
      // Path to your Tailwind base styles:
      './src/tailwind.css',
      './src/styles/custom.css',
      '@fontsource-variable/open-sans'
    ],
    social: {
      github: 'https://github.com/withastro/starlight'
    },
    sidebar: [{
      label: 'Guides',
      autogenerate: {
        directory: 'guides'
      }
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }],
    components: {
      Header: './src/components/Header.astro',
      MobileMenuToggle: './src/components/MobileMenuToggle.astro',
      PageFrame: './src/components/PageFrame.astro',
      MobileTableOfContents: './src/components/MobileTableOfContents.astro'
    }
  }), tailwind({
    // Disable the default base styles:
    applyBaseStyles: false
  })]
});