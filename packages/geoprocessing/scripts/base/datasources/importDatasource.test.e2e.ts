import { importDatasource } from "./importDatasource.js";
import {
  ProjectClientBase,
  internalVectorDatasourceSchema,
  internalRasterDatasourceSchema,
} from "../../../src/index.js";
import configFixtures from "../../../src/testing/fixtures/projectConfig.js";
import fs from "fs-extra";
import path from "node:path";

const projectClient = new ProjectClientBase(configFixtures.simple);
const srcPath = "data/in";
const dstPath = "data/out";

describe("importDatasource", () => {
  describe("importVectorDatasource - single file, single class", () => {
    const dstConfigFilename = "datasources_test_1.json";
    const dstConfigFilePath = path.join(dstPath, dstConfigFilename);
    const datasourceId = "eez";

    beforeEach(() => {
      // Ensure test data folder
      fs.mkdirsSync(dstPath);
      // Start off with clean empty config file
      fs.writeJSONSync(dstConfigFilePath, []);
    });
    test("importVectorDatasource - single file, single class should write file to dist and save config", async () => {
      const returnedDs = await importDatasource(
        projectClient,
        {
          geo_type: "vector",
          src: path.join(srcPath, `${datasourceId}.json`),
          datasourceId,
          classKeys: [],
          formats: [],
          propertiesToKeep: [],
          precalc: true,
          explodeMulti: true,
        },
        {
          newDatasourcePath: dstConfigFilePath,
          newDstPath: dstPath,
          doPublish: false,
        },
      );
      const savedDs = fs.readJSONSync(dstConfigFilePath);
      expect(Array.isArray(savedDs) && savedDs.length === 1).toBe(true);
      const validDs = internalVectorDatasourceSchema.parse(savedDs[0]);
      expect(returnedDs).toEqual(validDs);
      expect(fs.existsSync(path.join(dstPath, `${datasourceId}.json`)));
      expect(fs.existsSync(path.join(dstPath, `${datasourceId}.fgb`)));
    }, 20_000);
    afterEach(() => {
      // Remove the output
      fs.removeSync(dstConfigFilePath);
      fs.removeSync(path.join(dstPath, `${datasourceId}.fgb`));
      fs.removeSync(path.join(dstPath, `${datasourceId}.json`));
    });
  });

  describe("importVectorDatasource - single file, multi-class", () => {
    const dstConfigFilename = "datasources_test_2.json";
    const dstConfigFilePath = path.join(dstPath, dstConfigFilename);
    const datasourceId = "deepwater_bioregions";

    beforeEach(() => {
      // Ensure test data folder
      fs.mkdirsSync(dstPath);
      // Start off with clean empty config file
      fs.writeJSONSync(dstConfigFilePath, []);
    });
    test("importVectorDatasource - single file, multi-class should write file to dist and save config", async () => {
      const returnedDs = await importDatasource(
        projectClient,
        {
          geo_type: "vector",
          src: path.join(srcPath, `${datasourceId}.json`),
          datasourceId,
          classKeys: ["Draft name"],
          formats: [],
          propertiesToKeep: [],
          precalc: true,
          explodeMulti: true,
        },
        {
          newDatasourcePath: dstConfigFilePath,
          newDstPath: dstPath,
        },
      );
      const savedDs = fs.readJSONSync(dstConfigFilePath);
      expect(Array.isArray(savedDs) && savedDs.length === 1).toBe(true);
      const validDs = internalVectorDatasourceSchema.parse(savedDs[0]);
      expect(returnedDs).toEqual(validDs);
      expect(fs.existsSync(path.join(dstPath, `${datasourceId}.json`)));
      expect(fs.existsSync(path.join(dstPath, `${datasourceId}.fgb`)));
    }, 20_000);
    afterEach(() => {
      // Remove the output
      fs.removeSync(dstConfigFilePath);
      fs.removeSync(path.join(dstPath, `${datasourceId}.fgb`));
      fs.removeSync(path.join(dstPath, `${datasourceId}.json`));
    });
  });

  describe("importRasterDatasource - single file, single class", () => {
    const dstConfigFilename = "datasources_test_raster.json";
    const dstConfigFilePath = path.join(dstPath, dstConfigFilename);
    const datasourceId = "quad_10";

    beforeEach(() => {
      // Ensure test data folder
      fs.mkdirsSync(dstPath);
      // Start off with clean empty config file
      fs.writeJSONSync(dstConfigFilePath, []);
    });
    test("importRasterDatasource - single file, single class should write file to dist and save config", async () => {
      const returnedDs = await importDatasource(
        projectClient,
        {
          geo_type: "raster",
          src: path.join(srcPath, `${datasourceId}.tif`),
          datasourceId,
          classKeys: [],
          formats: ["tif"],
          noDataValue: 0,
          band: 1,
          measurementType: "quantitative",
          precalc: true,
        },
        {
          newDatasourcePath: dstConfigFilePath,
          newDstPath: dstPath,
        },
      );
      const savedDs = fs.readJSONSync(dstConfigFilePath);
      expect(Array.isArray(savedDs) && savedDs.length === 1).toBe(true);
      const validDs = internalRasterDatasourceSchema.parse(savedDs[0]);
      expect(returnedDs).toEqual(validDs);
      expect(fs.existsSync(path.join(dstPath, `${datasourceId}.tif`)));
    }, 10_000);
    afterEach(() => {
      // Remove the output
      fs.removeSync(dstConfigFilePath);
      fs.removeSync(path.join(dstPath, `${datasourceId}.tif`));
    });
  });
});
