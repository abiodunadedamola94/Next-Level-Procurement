// Inlines Lucide icons into index.src.html so they inherit text colour.
// Usage: node build.mjs  →  writes index.html
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(here, "index.src.html"), "utf8");
const out = src.replace(/\{\{i:([\w-]+)\}\}/g, (_, name) => {
  const svg = readFileSync(join(here, "assets/icons", `${name}.svg`), "utf8");
  return svg
    .replace(/<svg /, '<svg class="icon" aria-hidden="true" focusable="false" ')
    .replace(/\swidth="[^"]*"/, "")
    .replace(/\sheight="[^"]*"/, "");
});
writeFileSync(join(here, "index.html"), out);
console.log("wrote index.html");
