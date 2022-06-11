import pkg from './package.json'
import babel from '@rollup/plugin-babel';
import image from "@rollup/plugin-image";

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            strict: false,
        }
    ],
    plugins: [babel({
        babelHelpers: 'bundled',
        exclude: "node_modules/**",
        presets: [
            "@babel/preset-env",
            "@babel/preset-react"
        ]
    }), image()],
    external: ['react', 'react-dom']
}
