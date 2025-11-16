import { defineConfig } from "tsdown";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm"],
    target: "node20",
    sourcemap: true,
    minify: true,
    clean: true,
    dts: true,
    outDir: "dist",
});
