import {
  ImportVectorDatasourceOptions,
  ImportRasterDatasourceOptions,
  importVectorDatasourceOptionsSchema,
  importRasterDatasourceOptionsSchema,
} from "../../../src/types/index.js";

import { importVectorDatasource } from "./importVectorDatasource.js";
import { importRasterDatasource } from "./importRasterDatasource.js";
import { ProjectClientBase } from "../../../src/index.js";

/**
 * Import a dataset into the project.  Must be a src file that OGR or GDAL can read.
 * Importing means stripping unnecessary properties/layers,
 * converting to cloud optimized format, publishing to the datasets s3 bucket,
 * and adding as datasource.
 */
export async function importDatasource<C extends ProjectClientBase>(
  projectClient: C,
  options: ImportVectorDatasourceOptions | ImportRasterDatasourceOptions,
  extraOptions: {
    doPublish?: boolean;
    newDatasourcePath?: string;
    newDstPath?: string;
    srcBucketUrl?: string;
  } = {},
) {
  if (options.geo_type === "vector") {
    const vectorOptions: ImportVectorDatasourceOptions =
      importVectorDatasourceOptionsSchema.parse(options);
    return importVectorDatasource(projectClient, vectorOptions, extraOptions);
  } else {
    const rasterOptions: ImportRasterDatasourceOptions =
      importRasterDatasourceOptionsSchema.parse(options);
    return importRasterDatasource(projectClient, rasterOptions, extraOptions);
  }
}
