import type { LegalSection } from "@/types/legal";

function LegalTable({ table }: { table: NonNullable<LegalSection["table"]> }) {
  return (
    <div className="border-border mt-4 overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="bg-subtle">
            {table.headers.map((header) => (
              <th
                key={header}
                className="text-foreground px-4 py-3 font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-border border-t">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="text-fg-muted px-4 py-3 align-top leading-6"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegalSectionContent({
  sections,
}: {
  sections: readonly LegalSection[];
}) {
  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-32 lg:scroll-mt-28"
        >
          <h2 className="text-foreground font-serif text-xl leading-tight font-semibold sm:text-2xl">
            {section.title}
          </h2>

          <div className="mt-3 flex flex-col gap-3">
            {section.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-fg-muted text-sm leading-7 sm:text-[15px]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {section.bullets ? (
            <ul className="mt-3 flex flex-col gap-2">
              {section.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="text-fg-muted flex gap-2.5 text-sm leading-7 sm:text-[15px]"
                >
                  <span
                    aria-hidden
                    className="bg-leaf-600 mt-2.5 size-1.5 shrink-0 rounded-full"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.table ? <LegalTable table={section.table} /> : null}
        </section>
      ))}
    </div>
  );
}
