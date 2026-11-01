import { Check, Minus, Info } from 'lucide-react';

type Cell = 'yes' | 'no' | string;
type Row = { feature: string; note?: string; values: [Cell, Cell, Cell, Cell, Cell] };

// Competitor values summarize each vendor's publicly documented feature
// availability for their free core edition at the time of writing; plan
// boundaries change, so the table tells readers to verify with vendor docs.
const rows: Row[] = [
  { feature: 'XML sitemaps', values: ['yes', 'yes', 'yes', 'yes', 'yes'] },
  { feature: 'Google News sitemap', values: ['yes', 'Add-on', 'yes', 'yes', 'Pro plan'] },
  { feature: 'Article & news structured data', values: ['yes', 'yes', 'yes', 'yes', 'yes'] },
  { feature: 'Story-level SEO & readability analysis', values: ['yes', 'yes', 'yes', 'yes', 'yes'] },
  { feature: 'Search & social snippet previews', values: ['yes', 'yes', 'yes', 'yes', 'yes'] },
  { feature: 'Redirect manager', values: ['yes', 'Add-on', 'yes', 'yes', 'Pro plan'] },
  { feature: '404 monitor', values: ['yes', 'Add-on', 'yes', 'Pro plan', 'Pro plan'] },
  { feature: 'Internal link suggestions', values: ['yes', 'Add-on', 'yes', 'Pro plan', 'Pro plan'] },
  { feature: 'Bulk metadata editing', values: ['yes', 'Add-on', 'yes', 'yes', 'Pro plan'] },
  { feature: 'AI-crawler controls (llms.txt)', values: ['yes', 'yes', 'yes', 'yes', 'varies'] },
  { feature: 'Dedicated newsroom with assigned roles', values: ['yes', 'no', 'no', 'no', 'no'] },
  { feature: 'Schema Aggregator endpoint', values: ['yes', 'no', 'no', 'no', 'no'] },
  { feature: 'Built-in WP Hide Login', values: ['yes', 'no', 'no', 'no', 'no'] },
  { feature: 'Free core edition', values: ['yes', 'yes', 'yes', 'yes', 'yes'] },
];

const competitors = ['Yoast SEO', 'Rank Math', 'SEOPress', 'All in One SEO'];

function CellValue({ value, brand }: { value: Cell; brand?: boolean }) {
  if (value === 'yes') {
    return (
      <span className={brand ? 'text-brand' : 'text-success'} aria-label="Included">
        <Check className="mx-auto h-5 w-5" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === 'no') {
    return (
      <span className="text-muted-foreground" aria-label="Not included">
        <Minus className="mx-auto h-5 w-5" />
      </span>
    );
  }
  return <span className="text-xs font-semibold text-muted-foreground">{value}</span>;
}

export function ComparisonTable() {
  return (
    <section className="mt-10" aria-labelledby="comparison-table-title">
      <h2 id="comparison-table-title" className="text-2xl font-extrabold md:text-3xl">
        PublishRank compared with the major SEO plugins
      </h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
        Feature availability in the free core edition, summarized from each vendor’s public
        documentation. PublishRank’s column follows its own documented toolkit.
      </p>
      <div className="mt-6 overflow-x-auto rounded-lg border bg-card shadow-[var(--shadow-card)]">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Feature comparison between PublishRank, Yoast SEO, Rank Math, SEOPress and All in One
            SEO in their free core editions
          </caption>
          <thead>
            <tr className="border-b bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="px-4 py-3 font-extrabold">
                Feature
              </th>
              <th scope="col" className="border-x-2 border-brand bg-brand-soft px-4 py-3 text-center font-extrabold text-brand">
                PublishRank
              </th>
              {competitors.map((name) => (
                <th scope="col" key={name} className="px-4 py-3 text-center font-bold">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-b last:border-b-0 align-middle">
                <th scope="row" className="px-4 py-3 font-semibold text-foreground">
                  {row.feature}
                </th>
                <td className="border-x-2 border-brand bg-brand-soft px-4 py-3 text-center">
                  <CellValue value={row.values[0]} brand />
                </td>
                {row.values.slice(1).map((value, i) => (
                  <td key={competitors[i]} className="px-4 py-3 text-center">
                    <CellValue value={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 flex max-w-3xl gap-2 rounded-lg border border-border bg-muted/50 p-4 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
        Competitor columns summarize publicly documented free-edition features at the time of
        writing; a dash means the capability is not part of the vendor’s documented free edition —
        verify current details with each vendor’s documentation before deciding. Automatic
        migration from other SEO plugins is planned for PublishRank, not currently available —
        always evaluate on your own staging site.
      </p>
    </section>
  );
}
