import { defineConfig, type Template, type TemplateItem } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import {
  customTemplates,
  DEFAULT_TEMPLATE_IDS_TO_HIDE,
} from "./sanity/templates";

const SINGLETON_TYPES = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "legalPage",
]);

export default defineConfig({
  basePath: "/admin",
  projectId: projectId ?? "",
  dataset,
  schema: {
    types: schemaTypes,
    // `templates` belongs under `schema`, not top-level on the workspace
    // config — putting it at the top level silently does nothing (no
    // typecheck error, since `defineConfig`'s options type doesn't reject
    // excess properties here), and every initial-value template item then
    // fails to resolve at runtime with "template id (`templateId`) is
    // required for initial value template item nodes".
    templates: (prev: Template[]) => [...prev, ...customTemplates],
  },
  document: {
    // Hide the auto-generated generic templates listed in
    // DEFAULT_TEMPLATE_IDS_TO_HIDE so the global "+" Create menu only ever
    // offers the named, destination-specific templates in `customTemplates`
    // — see `sanity/templates.ts` for why. Every other document type's
    // default template is untouched.
    newDocumentOptions: (prev: TemplateItem[]) =>
      prev.filter(
        (item) => !DEFAULT_TEMPLATE_IDS_TO_HIDE.includes(item.templateId),
      ),
    actions: (prev, context) => {
      if (!SINGLETON_TYPES.has(context.schemaType)) {
        return prev;
      }

      return prev.filter(
        ({ action }) => action && !["duplicate", "delete"].includes(action),
      );
    },
  },
  plugins: [structureTool({ structure })],
});
