import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import boundaries from "eslint-plugin-boundaries";

const FSD_LAYERS = ["shared", "entities", "features", "widgets", "views", "app"];

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Next.js
  {
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // FSD Boundaries
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: ["app/*", "src/app/*"], mode: "full" },
        { type: "views", pattern: ["src/views/*"] },
        { type: "widgets", pattern: ["src/widgets/*"] },
        { type: "features", pattern: ["src/features/*"] },
        { type: "entities", pattern: ["src/entities/*"] },
        { type: "shared", pattern: ["src/shared/*"] },
      ],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "app", allow: ["views", "widgets", "features", "entities", "shared"] },
            { from: "views", allow: ["widgets", "features", "entities", "shared"] },
            { from: "widgets", allow: ["features", "entities", "shared"] },
            { from: "features", allow: ["entities", "shared"] },
            { from: "entities", allow: ["shared"] },
            { from: "shared", allow: ["shared"] },
          ],
        },
      ],
      "boundaries/entry-point": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              target: ["views", "widgets", "features", "entities"],
              allow: "index.ts",
            },
            {
              target: ["shared"],
              allow: ["**"],
            },
            {
              target: ["app"],
              allow: ["**"],
            },
          ],
        },
      ],
    },
  },

  // Global ignores
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "*.config.*",
    ],
  },

  // Disable rules that conflict with TypeScript
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
);
