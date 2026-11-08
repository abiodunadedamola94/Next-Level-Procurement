// Writes public/route-map-dots.svg: the dotted map behind the route map (components/home/RouteMap.tsx).
// It used to be inlined as a data URI, which put about 715 KB into every page that shows the map.
// Keep the options here identical to RouteMap.tsx, then run: node scripts/build-route-map.mjs
import fs from "node:fs";
import DottedMap from "dotted-map";

const map = new DottedMap({
  height: 64,
  grid: "diagonal",
  region: { lat: { min: -36, max: 64 }, lng: { min: -22, max: 128 } },
});
const svg = map.getSVG({ radius: 0.2, color: "#2c3039", shape: "circle", backgroundColor: "transparent" });
fs.writeFileSync(new URL("../public/route-map-dots.svg", import.meta.url), svg);
console.log("wrote public/route-map-dots.svg", svg.length, "bytes");
