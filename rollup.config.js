import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
  // ESM build
  {
    input: "src/index.ts",
    output: { file: "dist/index.js", format: "esm", sourcemap: true },
    plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })],
    external: ["react", "react-dom"] // avoid bundling React
  },
  // Types build
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()]
  }
];
