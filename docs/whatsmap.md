# WhatsMAP — Conversational Market Expert & Action Engine

WhatsMAP is both Q&A (grounded answers about projects/availability) and Action Engine (runs flows like brochure generation, Meta launch).

## Endpoints

- GET /api/wa/webhook  - Meta verification using WHATSAPP_WEBHOOK_VERIFY_TOKEN
- POST /api/wa/webhook - inbound messages
  - Maps phone -> uid using waPhoneMap/{phone} = { uid }
  - If Q&A, calls /api/qa/query and saves assistant reply to users/{uid}/conversations/{phone}/messages
  - If Action, creates users/{uid}/jobs/{jobId} with plan + steps

## Q&A flow

1) Parse text -> filters: src/lib/qa/parse.ts
2) Search candidates -> src/lib/qa/search.ts
3) Optional availability -> src/lib/qa/availability.ts
4) Compose answer -> src/lib/qa/answer.ts
5) API -> POST /api/qa/query

### Example Q
> 2 bed under 2.5m emaar beachfront availability

- bedrooms: 2
- max price: 2.5M
- developer: Emaar
- city/area: Beachfront

### Example answer
- Emaar Beachfront … from AED 1,950,000 …
- -> 2BR available from AED 2,100,000 …
- Reply with 'compare A vs B' or 'create brochure for <project>'

## Actions (Core7 style)

- lead-capture: createLead -> enrichLead -> generateScript -> scheduleFollowups
- listing-sync: composeListing -> validate -> syncBayut -> verify
- designer: extractSections -> generateLandingPage -> publish
- investor-match: profileToFilters -> smartFilter -> rank

You can extend planForText() in /api/wa/webhook to add more.
