import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { defineConfig } from 'rollup';

// Plugin Metadata
const pluginName = 'TimebarPlugin';
const outputFileName = 'timebar-plugin';
const outputDir = 'dist';

export default defineConfig({
  input: 'src/index.js', // Entry point
  output: [
    {
      file: `${outputDir}/${outputFileName}.js`,
      format: 'umd',
      name: pluginName, // Global name for UMD
    },
    {
      file: `${outputDir}/${outputFileName}.min.js`,
      format: 'umd',
      name: pluginName,
      plugins: [terser()],
    },
    {
      file: `${outputDir}/${outputFileName}.esm.js`,
      format: 'es',
    },
  ],
  plugins: [
    resolve(), // Resolves node_modules
    commonjs(), // Converts CommonJS to ES Modules
    postcss({
      extract: `${outputFileName}.css`, // Extract CSS to a separate file
      minimize: true, // Minify CSS
    }),
    serve({
      open: true,
      contentBase: ['public', outputDir],
      port: 3000,
    }),
    livereload({
      watch: outputDir,
    }),
  ],
});