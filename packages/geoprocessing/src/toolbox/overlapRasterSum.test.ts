import { describe, test, expect } from "vitest";
import fix from "../testing/fixtures/sketches.js";
import parseGeoraster from "georaster";
import { overlapRasterSum } from "./overlapRasterSum.js";

// bbox  - [xmin, ymin, xmax, ymax]
// pixel - [left, bottom, right, top]

describe("overlapRasterSum test", () => {
  test("overlapRasterSum - bottom left raster cell sum should be 0", async () => {
    const raster = await parseGeoraster(
      [
        [
          [1, 2],
          [0, 1],
        ],
      ],
      {
        noDataValue: 0,
        projection: 4326,
        xmin: 0, // left
        ymax: 20, // top
        pixelWidth: 10,
        pixelHeight: 10,
      },
    );
    const metrics = await overlapRasterSum("test", raster, fix.bottomLeftPoly);
    expect(metrics.length).toBe(1);
    expect(metrics[0].value).toBe(0);
  });

  test("overlapRasterSum - top right raster cell sum should be 2", async () => {
    const raster = await parseGeoraster(
      [
        [
          [1, 2],
          [1, 1],
        ],
      ],
      {
        noDataValue: 0,
        projection: 4326,
        xmin: 0, // left
        ymax: 20, // top
        pixelWidth: 10,
        pixelHeight: 10,
      },
    );
    const metrics = await overlapRasterSum("test", raster, fix.topRightPoly);
    expect(metrics.length).toBe(1);
    expect(metrics[0].value).toBe(2);
  });

  test("overlapRasterSum - top right raster cell - truncation", async () => {
    const raster = await parseGeoraster(
      [
        [
          [1, 0.002_345_6],
          [1, 1],
        ],
      ],
      {
        noDataValue: 0,
        projection: 4326,
        xmin: 0, // left
        ymax: 20, // top
        pixelWidth: 10,
        pixelHeight: 10,
      },
    );
    const metricsTruncationFalse = await overlapRasterSum(
      "test",
      raster,
      fix.topRightPoly,
      {
        truncate: false,
      },
    );
    expect(metricsTruncationFalse.length).toBe(1);
    expect(metricsTruncationFalse[0].value).toBe(0.002_345_6);

    const metricsTruncationTrue = await overlapRasterSum(
      "test",
      raster,
      fix.topRightPoly,
      {
        truncate: true,
      },
    );
    expect(metricsTruncationTrue.length).toBe(1);
    expect(metricsTruncationTrue[0].value).toBe(0.002_346);

    const metricsTruncationDefault = await overlapRasterSum(
      "test",
      raster,
      fix.topRightPoly,
    );
    expect(metricsTruncationDefault.length).toBe(1);
    expect(metricsTruncationDefault[0].value).toBe(0.002_346);
  });

  test("overlapRasterSum - top right raster cell - truncation with very small value", async () => {
    const raster = await parseGeoraster(
      [
        [
          [1, 8.58e-7],
          [1, 1],
        ],
      ],
      {
        noDataValue: 0,
        projection: 4326,
        xmin: 0, // left
        ymax: 20, // top
        pixelWidth: 10,
        pixelHeight: 10,
      },
    );
    const metricsTruncation = await overlapRasterSum(
      "test",
      raster,
      fix.topRightPoly,
      {
        truncate: true,
      },
    );
    expect(metricsTruncation.length).toBe(1);
    expect(metricsTruncation[0].value).toBe(8.58e-7); // Value untruncated because it would truncate to 0

    const metricsNoTruncation = await overlapRasterSum(
      "test",
      raster,
      fix.topRightPoly,
      {
        truncate: false,
      },
    );
    expect(metricsNoTruncation.length).toBe(1);
    expect(metricsNoTruncation[0].value).toBe(8.58e-7); // Value untruncated

    const metricsDefaultTruncation = await overlapRasterSum(
      "test",
      raster,
      fix.topRightPoly,
      {
        truncate: false,
      },
    );
    expect(metricsDefaultTruncation.length).toBe(1);
    expect(metricsDefaultTruncation[0].value).toBe(8.58e-7); // Value untruncated because it would truncate to 0
  });

  test("overlapRasterSum - whole raster sum should be 5", async () => {
    const raster = await parseGeoraster(
      [
        [
          [1, 2],
          [1, 1],
        ],
      ],
      {
        noDataValue: 0,
        projection: 4326,
        xmin: 0, // left
        ymax: 20, // top
        pixelWidth: 10,
        pixelHeight: 10,
      },
    );
    const metrics = await overlapRasterSum("test", raster, fix.wholePoly);
    expect(metrics.length).toBe(1);
    expect(metrics[0].value).toBe(5);
  });

  test("overlapRasterSum - mixed coll should handle overlap and not double count", async () => {
    const raster = await parseGeoraster(
      [
        [
          [1, 2],
          [1, 1],
        ],
      ],
      {
        noDataValue: 0,
        projection: 4326,
        xmin: 0, // left
        ymax: 20, // top
        pixelWidth: 10,
        pixelHeight: 10,
      },
    );
    const metrics = await overlapRasterSum("test", raster, fix.wholeMixedSC);
    expect(metrics.length).toBe(3);
    expect(metrics[0].value).toBe(5); // first sketch
    expect(metrics[1].value).toBe(5); // second sketch
    expect(metrics[2].value).toBe(5); // collection - no double count
  });

  test("overlapRasterSum - should not count holes", async () => {
    const raster = await parseGeoraster(
      [
        [
          [1, 2],
          [1, 1],
        ],
      ],
      {
        noDataValue: 0,
        projection: 4326,
        xmin: 0, // left
        ymax: 20, // top
        pixelWidth: 10,
        pixelHeight: 10,
      },
    );
    const metrics = await overlapRasterSum("test", raster, fix.holeBlPoly);
    expect(metrics.length).toBe(1);
    expect(metrics[0].value).toBe(4); // first sketch
  });

  test("overlapRasterSum - should handle holes in each sketch, that cancel in collection for full sum", async () => {
    const raster = await parseGeoraster(
      [
        [
          [1, 2],
          [1, 1],
        ],
      ],
      {
        noDataValue: 0,
        projection: 4326,
        xmin: 0, // left
        ymax: 20, // top
        pixelWidth: 10,
        pixelHeight: 10,
      },
    );
    const metrics = await overlapRasterSum("test", raster, fix.holeMixedSC);
    expect(metrics.length).toBe(3);
    expect(metrics[0].value).toBe(4); // first sketch
    expect(metrics[1].value).toBe(3); // second sketch
    expect(metrics[2].value).toBe(5); // collection is full sum, each sketch picking up the others hole
  });
});
