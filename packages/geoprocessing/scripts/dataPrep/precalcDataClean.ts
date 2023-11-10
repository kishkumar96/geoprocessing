import { precalcCleanup } from "../base/datasources/";
import { getProjectClient } from "../base/project/projectClient";
import { writePrecalcMetrics } from "../base/datasources/precalc";

// This is a standalone script used as a CLI command with a top-level function

const projectPath = process.argv[2];
const projectClient = getProjectClient(projectPath);

// Wrap in an IIFE to use async/await
void (async function () {
  const cleanMetrics = await precalcCleanup(projectClient);
  await writePrecalcMetrics(cleanMetrics);
  console.log("Precalc cleanup complete");
})();
