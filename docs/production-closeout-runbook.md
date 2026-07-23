# Production Closeout Runbook

Use this for the final Academy category migration, Sanity webhook update,
custom-domain launch, production QA, and handover. Mailchimp remains a separate
workstream and is not changed here.

## 1. Academy category rollout

**Completed 2026-07-23:** Development and Production migrations passed clean
dry-runs, executed without warnings/errors, and passed idempotency checks.
Production backup:
`/private/tmp/iproduce-production-before-academy-categories-2026-07-23.tar.gz`
(`de94a7039b77b021aea59caec5c1a369a03accd76f430f2a3c5cc482843c383b`).
The final required-reference schema deploy remains the last repo-side step.

### Compatibility deploy

- Deploy `academyCategory`, Article/Webinar reference fields, fallback queries,
  CMS-derived filters, real badge tones, search, and webhook code.
- Keep reference validation at warning level until both datasets are migrated.
- Keep legacy Article `category` and Webinar `type` fields hidden and unchanged.

### Migration commands

Dry-run is the default. Production execution requires both flags.

```bash
pnpm migrate:academy-categories -- --dataset development
pnpm migrate:academy-categories -- --dataset development --execute

pnpm migrate:academy-categories -- --dataset production
pnpm exec sanity datasets export production /private/tmp/iproduce-production-before-academy-categories.tar.gz
pnpm migrate:academy-categories -- --dataset production --execute --allow-production
```

The migration:

- creates 12 deterministic category documents idempotently;
- patches only documents without `categoryRef`;
- reads drafts and published records;
- reports duplicates, unknown legacy values, dangling references, and
  incompatible assignments;
- never removes legacy fields.

After each execute, rerun the dry-run. Expected result: all seed categories
`MATCH`, all migrated records `SKIP`, with zero `CREATE`, `PATCH`, or `ERROR`.

### Dataset verification

- Studio shows **Academy → Categories**.
- Article selector only shows Article-enabled categories.
- Webinar selector only shows Webinar-enabled categories.
- A category may be available to either catalogue, both, or neither.
- Turning both switches off prevents new assignment but existing references
  continue rendering.
- Strong references block deletion while content still uses the category.
- Public filters show only represented published categories, in display order.
- Article search chips use the category's real tone.
- Related Articles prioritize the same category slug.

After both datasets pass, change both reference validations from warning-level
custom rules to required and deploy the final schema.

## 2. Sanity dashboard tasks

**Owner: Nabeel / Vextra operations. These settings produce no Git diff.**

Update Development and Production revalidation webhooks:

- include `academyCategory` in the document-type filter;
- include `"id": _id` in the projection;
- retain `_type`, current slug, previous slug, and legal key.

Verify with signed publishes:

1. Edit an Author and confirm HTTP 200 plus refreshed referenced Article pages.
2. Rename or recolour a Category and confirm Home, Academy, Blog/Webinar
   listings/details, and Academy search refresh.
3. Record the completed dashboard settings in the handover checklist.

## 3. Domain preparation and go/no-go

The domain switch is a separate operational decision, not the next automatic
step after migration.

At least one current TTL window before launch:

- lower only the apex website A-record and `www` CNAME TTL from about `14400`
  to `300`;
- export or screenshot the complete existing DNS zone;
- keep the old WordPress hosting available for rollback;
- add apex and `www` to the Vercel project;
- configure apex as primary and `www` as its redirect;
- use only DNS values shown by Vercel;
- recheck CAA immediately before cutover (none existed at planning time).

Do not alter Zoho MX, SPF, DMARC, Resend DKIM, Mailchimp DKIM, or any other mail
record.

Proceed only when:

- Production categories and revalidation are stable;
- the Production deployment is Ready;
- operational forms pass on the Vercel Production URL;
- the client explicitly approves launch;
- old DNS values and the rollback owner are recorded.

Before switching DNS, add `iproduceafrica.com` and
`www.iproduceafrica.com` to the Production Turnstile hostname allowlist. Keep
the Vercel Production hostname temporarily for verification.

At cutover:

- replace only the old website A/CNAME records;
- set `NEXT_PUBLIC_SITE_URL=https://iproduceafrica.com`;
- set `EMAIL_ASSETS_BASE_URL=https://iproduceafrica.com`;
- redeploy Production.

If launch has a critical failure, restore the recorded old apex A-record and
`www` CNAME. Leave all email records untouched. After 24–48 stable hours,
restore website-record TTL to `3600` or the previous `14400`.

## 4. Production QA

Run locally:

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm format:check
pnpm build
git diff --check
```

Browser-check mobile, tablet, and desktop, then verify:

- apex HTTPS and `www` redirect;
- all public and legal routes, `/admin`, robots, and sitemap;
- canonical and Open Graph URLs use the custom domain;
- Sanity publishes refresh the custom domain;
- Contact, Partner, Community, and Academy operational forms;
- Turnstile accepts the apex and safely rejects missing/invalid tokens.

Mailchimp newsletter QA remains delegated to its separate owner.

## 5. Search and handover

- Create or verify client-owned Google Search Console and Bing Webmaster
  properties.
- Submit `https://iproduceafrica.com/sitemap.xml`.
- Confirm client access to Sanity, Vercel, GitHub, DNS, Zoho, Resend, and
  Mailchimp.
- Record a short CMS training video covering Articles, Webinars, Categories,
  Site Settings, media, and publishing.
- Provide a short guide for CMS, hosting, DNS, forms, email providers,
  rollback, support contacts, and the one-release archive-removal checkpoint.
