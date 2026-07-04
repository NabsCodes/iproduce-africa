import type { StructureResolver } from "sanity/structure";

// Phase 1 desk: three Academy catalogues + Authors. No Vision plugin.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("academyArticle").title("Articles"),
      S.documentTypeListItem("academyWebinar").title("Webinars & Events"),
      S.documentTypeListItem("academyCourse").title("Courses"),
      S.documentTypeListItem("author").title("Authors"),
    ]);
