import DottedMap from "dotted-map";
import RouteMapArcs, { type Place, type Arc } from "./RouteMapArcs";

// Built once at build time: a dotted map cropped to the markets she buys from
// (UK, China, Europe, Turkey, Africa) and where orders go (UK, Nigeria, elsewhere).
const map = new DottedMap({
  height: 64,
  grid: "diagonal",
  region: { lat: { min: -36, max: 64 }, lng: { min: -22, max: 128 } },
});

const svg = map.getSVG({ radius: 0.2, color: "#2c3039", shape: "circle", backgroundColor: "transparent" });
const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const W = (map as unknown as { width: number }).width;
const H = (map as unknown as { height: number }).height;

const at = (lat: number, lng: number) => {
  const p = map.getPin({ lat, lng })!;
  return { x: p.x, y: p.y };
};

const places: Place[] = [
  { id: "uk", label: "London, UK", kind: "both", ...at(51.5, -0.12) },
  { id: "eu", label: "Europe", kind: "source", ...at(50.1, 8.7) },
  { id: "tr", label: "Istanbul, Turkey", kind: "source", ...at(41.0, 28.97) },
  { id: "cn", label: "Guangzhou, China", kind: "source", ...at(23.1, 113.3) },
  { id: "af", label: "Nairobi, Africa", kind: "source", ...at(-1.29, 36.8) },
  { id: "ng", label: "Lagos, Nigeria", kind: "dest", ...at(6.5, 3.4) },
];

const arcs: Arc[] = [
  { from: "cn", to: "ng" },
  { from: "uk", to: "ng" },
  { from: "tr", to: "ng" },
  { from: "cn", to: "uk" },
  { from: "eu", to: "ng" },
  { from: "af", to: "uk" },
];

export default function RouteMap({ after, n }: { after?: React.ReactNode; n?: string | null }) {
  return <RouteMapArcs width={W} height={H} dataUri={dataUri} places={places} arcs={arcs} after={after} n={n} />;
}
