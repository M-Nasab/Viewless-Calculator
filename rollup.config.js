import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import filesize from 'rollup-plugin-filesize';

const isProduction = process.env.NODE_ENV === "production";

const name = "Calculator";

const destBase = "dist/calculator";
const destExtension = `${isProduction ? ".min" : ""}.js`;

export default {
    input: 'src/index.js',
    output: [
        {
            file: `${destBase}${destExtension}`,
            format: "cjs"
        },
        {
            file: `${destBase}.esm${destExtension}`,
            format: "esm"
        },
        {
            file: `${destBase}.umd${destExtension}`,
            format: "umd",
            name,
        },
        {
            file: `${destBase}.amd${destExtension}`,
            format: "amd",
            name,
        },
        {
            file: `${destBase}.browser${destExtension}`,
            format: "iife",
            name,
        }
    ],
    plugins: [
        commonjs(),
        resolve(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        }),
        isProduction && terser(),
        filesize()
    ].filter(Boolean),
};