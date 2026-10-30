<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep offer prices, original prices, installment counts, and derived amounts in `src/lib/offers.ts`; all price displays and WhatsApp messages use it to prevent inconsistent totals.
- Keep lead validation, qualification routing, and WhatsApp URL generation in `src/lib/lead.ts`; the client-only handoff validates before navigation and never generates contact URLs for future-date leads. No lead data is persisted or sent to an app server.
- Keep the campaign coupon in `src/lib/lead.ts` and reuse it in page copy and WhatsApp messages so the displayed and sent codes stay identical.
- Keep the visit countdown in `src/lib/countdown.ts`, using a client-side deadline and stopping at zero; isolate timing so expiration is testable without changing lead qualification.
- Derive sitemap paths from required route-level `staticData.sitemap` decisions; exclude lead thank-you pages and omit lastmod without authoritative page-specific dates so public discovery stays accurate.
- Serve patient photo collages and the separate patient video through CDN asset pointers; keep all photo comparisons in the hero ResultsCarousel, prioritize its first image and load later slides after hydration, and use video preload="none" to preserve initial page speed. Carousel controls and reduced-motion handling let visitors inspect results without duplication farther down the page.
