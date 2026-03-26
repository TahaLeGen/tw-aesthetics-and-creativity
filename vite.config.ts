import { defineConfig } from 'vite'
import { sallaTransformPlugin, sallaBuildPlugin, sallaDemoPlugin } from '@salla.sa/twilight-bundles/vite-plugins'

export default defineConfig({
  plugins: [
    sallaTransformPlugin(),
    sallaBuildPlugin(),
    sallaDemoPlugin({
      // Show only specific components
<<<<<<< HEAD
      components: ["links","announcement-bar","flash-sale-banners"],
=======
      components: ["links"],
>>>>>>> 4125922837bfdeffbf26701a1494c5f9104f1e11
      
      // Customize grid layout
      grid: {
        columns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        minWidth: '768px'
      },

      // Add custom styles
      css: `
        .component-card {
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .component-card:hover {
          transform: translateY(-2px);
        }
      `,

      // Add custom JavaScript
      js: `
        console.log('Demo page loaded!');
        // Add your custom JavaScript here
      `
    })
  ]
});

