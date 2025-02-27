import { ProjectClientBase } from "../../../src/project/ProjectClientBase.js";
import fs from "fs-extra";
import path from "node:path";

export function getProjectClient(projectPath: string) {
  const datasources = fs.readJsonSync(
    path.join(projectPath, "project", "datasources.json"),
  );
  const geographies = fs.readJsonSync(
    path.join(projectPath, "project", "geographies.json"),
  );
  const metrics = fs.readJsonSync(
    path.join(projectPath, "project", "metrics.json"),
  );
  const precalc = fs.readJsonSync(
    path.join(projectPath, "project", "precalc.json"),
  );
  const objectives = fs.readJsonSync(
    path.join(projectPath, "project", "objectives.json"),
  );
  const basic = fs.readJsonSync(
    path.join(projectPath, "project", "basic.json"),
  );
  const projectPackage = fs.readJsonSync(
    path.join(projectPath, "package.json"),
  );
  const gp = fs.readJsonSync(
    path.join(projectPath, "project", "geoprocessing.json"),
  );

  return new ProjectClientBase({
    datasources,
    geographies,
    metricGroups: metrics,
    precalc,
    objectives,
    basic,
    package: projectPackage,
    geoprocessing: gp,
  });
}
