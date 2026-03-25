declare module '@salla.sa/twilight-bundles/vite-plugins' {
  import type { Plugin } from 'vite';
  
  export function sallaTransformPlugin(): Plugin;
  export function sallaBuildPlugin(): Plugin;
  export function sallaDemoPlugin(options?: {
    components?: string[];
    grid?: {
      columns?: string;
      gap?: string;
      minWidth?: string;
    };
    css?: string;
    js?: string;
  }): Plugin;
}
