import type { ReactElement } from "react";
import { render } from "@react-email/render";

export async function renderEmailTemplate(template: ReactElement) {
  const [html, text] = await Promise.all([
    render(template),
    render(template, { plainText: true }),
  ]);
  return { html, text };
}
