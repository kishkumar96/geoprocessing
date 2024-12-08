import { readFileSync } from "node:fs";
import { geojson } from "flatgeobuf";
import { takeAsync } from "flatgeobuf/lib/mjs/streams/utils.js";
import { deserialize } from "flatgeobuf/lib/mjs/geojson.js";
import { BBox, Feature, FeatureCollection, Geometry } from "../types/index.js";

export interface FgBoundingBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export function fgBoundingBox(box: BBox): FgBoundingBox {
  return {
    minX: box[0],
    maxX: box[2],
    minY: box[1],
    maxY: box[3],
  };
}

/**
 * Fetch features from flatgeobuf at url within bounding box
 * Awaits all features before returning, rather than streaming them.
 * @deprecated Use `loadCog` instead.
 */
export async function fgbFetchAll<F extends Feature<Geometry>>(
  url: string,
  box?: BBox,
) {
  return loadFgb<F>(url, box);
}

/**
 * Fetch features from flatgeobuf at url that intersect with bounding box
 * Awaits all features before returning, rather than streaming them.
 */
export async function loadFgb<F extends Feature<Geometry>>(
  url: string,
  box?: BBox,
) {
  const fgBox = (() => {
    if (!box && !Array.isArray(box)) {
      return fgBoundingBox([-180, -90, 180, 90]); // fallback to entire world
    } else {
      return fgBoundingBox(box);
    }
  })();

  if (process.env.NODE_ENV !== "test")
    console.log("loadFgb", `url: ${url}`, `box: ${JSON.stringify(fgBox)}`);

  const features = (await takeAsync(
    deserialize(url, fgBox) as AsyncGenerator,
  )) as F[];
  if (!Array.isArray(features))
    throw new Error("Unexpected result from loadFgb");
  return features;
}

/**
 * Synchronously load a flatgeobuf file from disk.  Assumed to be in WGS84 EPSG:4326 projection
 * @param path path to flatgeobuf file
 * @returns feature collection of features from disk
 */
export function loadFgbFromDisk<G extends Geometry>(path: string) {
  // Fetch all reef features and calculate total area
  const buffer = readFileSync(path);
  return geojson.deserialize(new Uint8Array(buffer)) as FeatureCollection<G>;
}
