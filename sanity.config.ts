import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/admin",
  projectId: projectId ?? "",
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure })],
});
