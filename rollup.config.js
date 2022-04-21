import { main, module } from './package.json';
import typescript from '@rollup/plugin-typescript';
export default {
  input: './src/index.ts',
  output: [
    // 1. cjs -> commonjs
    // 2. esm
    {
      format: 'cjs',
      file: main
    },
    {
      format: 'es',
      file: module
    }
  ],

  plugins: [typescript()]
};
