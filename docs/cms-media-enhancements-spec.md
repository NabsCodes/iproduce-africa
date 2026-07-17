# CMS Media Enhancements

## Status

Implemented in code on 2026-07-17. This small client-visible media slice was
sequenced before CMS-managed categories because it does not require a dataset
migration. No development or production Sanity documents were modified.

## Partner Voices avatars

- Partner Voices and the shared testimonial carousel consume the same
  `TestimonialItem` contract.
- The fetch layer supplies the stable Sanity document ID, optional photo,
  editor-provided initials, and name-derived initials as a fallback.
- Both carousels use the stable Sanity ID as their React key.
- Partner Voices uses the existing shared Avatar primitives rather than a
  bespoke image treatment.

## Story / What We Do video

- The About Story owns one optional `story.videoUrl` field; the Home page
  singleton owns a matching optional `whatWeDoVideoUrl` field (Section media
  group). Both surfaces render through the same shared `VideoPoster`
  component with identical validation and blank-state behaviour.
- `lib/video-embeds.ts` is the single schema/fetch boundary for validating and
  normalising supported URLs.
- Only HTTP(S) YouTube and Vimeo hosts are accepted. The application extracts
  the provider ID and constructs its own `youtube-nocookie.com` or Vimeo DNT
  embed URL; editor query parameters and untrusted hosts are never forwarded.
- Invalid direct writes degrade to the same poster-only state as a blank field.
- `components/shared/video-poster.tsx` exposes only the API both surfaces
  need today; further consumers reuse it rather than fork it.
- Before a visitor clicks Play, the page renders only the poster and a real
  button. No provider iframe, script, request, or cookie is created.
- After activation the iframe is mounted, titled, and focused. YouTube uses its
  privacy-enhanced host and Vimeo uses its DNT option.
- A blank video URL shows the poster without a decorative play control. The
  old non-functional play icon on Home's What We Do section was removed as
  part of adopting this behaviour.
- No video URLs are seeded; the client enters real URLs per dataset when the
  videos exist.

Direct Sanity video uploads, custom transcoding, caption hosting, analytics,
playlists, and autoplay-before-consent remain outside this slice.

## Image delivery follow-up

Sanity hotspot selection is available to editors, while many public surfaces
still use code-owned aspect ratios and CSS `object-cover`. The current generic
image URLs do not consistently apply hotspot-aware crop parameters and may
serve larger originals than each surface needs.

Treat image delivery as its own reviewed slice:

1. inventory every CMS image surface and its responsive widths/aspect ratios;
2. choose between per-surface Sanity image-builder URLs and a shared Sanity
   `next/image` loader;
3. preserve editor crop/hotspot metadata where the design permits;
4. verify mobile focal points, generated payload sizes, and fallbacks;
5. avoid changing approved layout ratios merely to expose free-form crops.

Do not bundle this cross-cutting work into the editorial-category migration.
