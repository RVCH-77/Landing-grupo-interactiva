# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no framework, no build step, served via XAMPP/Apache. Confirmed 2026-08-26: full multi-page site. Revised 2026-08-30: the client supplied an actual design reference (`Ginteractiva.pdf`) showing the Gobierno/Empresas carousels (arrows + dot pagination, full content per slide). Revised again 2026-09-05: the client asked for those carousels to live inline on the home page instead of on separate `/gobierno/` and `/empresas/` pages — "ya no va a ir en otra página." Both pages were deleted; the site is now a single primary page (`index.html`) carrying the hero, GIM Neuroscience/Analytics, Quiénes somos, the Gobierno services carousel (`#servicios`), the Empresas services carousel (`#servicios-empresas`), an Experiencia/portfolio placeholder (`#experiencia`, ex-"Trabajo seleccionado," repositioned below both carousels — content still pending from the client), Clientes, and Contacto — plus the 3 shared service pages (Producción de Video, Estrategia y Marketing Digital, Contact Center under `servicios/`), which remain standalone since their content (video grid, checklist, domain-search tool) doesn't fit the carousel's image+text pattern.

## Users

Two primary audiences, each with its own hub and service framing:

- **Gobierno** — government entities: municipal/state/federal offices, water-utility operators ("organismos operadores de agua"), public institutions. Job: govern more effectively, collect what's owed, and campaign/communicate with citizens.
- **Empresas** — companies/businesses across sectors (including financial institutions). Job: understand customers/market, sell more, and run efficient customer communication/collections.

Both are evaluated by the earlier-confirmed job: a decision-maker deciding whether to hire Grupo Interactiva.

## Product Purpose

Grupo Interactiva México (GIM) is a full-stack communication, data-intelligence, and AI company, not a conventional marketing/branding shop. It bundles traditional agency services (branding, video production, digital marketing, contact center) with AI-driven and neuroscience-driven offerings (generative-AI virtual assistants, neuropolitics/applied neuroscience, geo-referenced market intelligence, government-program "potentialization" campaigns). Success is a Gobierno or Empresas prospect understanding the specific service they need and contacting GIM.

## Positioning

The differentiator confirmed by the client's own sitemap brief (source: `ESTRUCTURA PAGINA WEB GIM 2026 (1).pptx`, provided 2026-08-26): GIM backs its claims with neuroscience and AI measurement instead of opinion/speculation — it measures conscious *and* unconscious reactions (visual, rational, emotional, neuronal) via neuroscience + algorithms, and cross-references geo-referenced behavioral data (searches, transactions) rather than relying on traditional surveys. Two sister brands carry this technical edge and are meant to be visible from the root of the site, linking out to their own websites while still explaining themselves in place:

- **GIM Neuroscience** — neurophysiological measurement (eye tracking, EEG/emotional tracking, neuronal tracking).
- **GIM Analytics** — geo-referenced data intelligence on tastes, interests, needs, and motivators.

## Operating Context

The client supplied the actual information architecture and copy via a slide deck (`ESTRUCTURA PAGINA WEB GIM 2026 (1).pptx`, 34 media files, 16 slides), not a free brief. That deck is now the authoritative content source for structure and Spanish copy — the earlier "comunicación, branding y marketing" framing from init was real but incomplete; this is the corrected, fuller picture. The deck itself is a work-in-progress sitemap: several slides read "(insertar texto de X ya sea de gobierno o empresas, lo que aplique)," meaning the Gobierno/Empresas paragraph already written for that service (slides 2–4) is the intended body copy for that service's own detail page — it is not missing, it is cross-referenced.

## Capabilities and Constraints

Confirmed site structure (2026-08-26, revised 2026-09-05 — see Stack for the page-consolidation history):

- **Nav** (all pages, uppercase, current item shown in solid brand red, no phone number in the header per 2026-09-05 request): INICIO (`index.html`), NOSOTROS (`#quienes-somos`), SERVICIOS (`#servicios` on the home page; still marked active on the 3 `servicios/*.html` pages), EXPERIENCIA (`#experiencia`), CONTACTO (`#contacto`).
- **Root / always-visible**: phone CTA `(477) 175-74-78` (now only in the closing Contacto band, not the header), Instagram (`instagram.com/grupointeractiva`), YouTube channel, an institutional background video, GIM Neuroscience callout+link, GIM Analytics callout+link, Quiénes Somos.
- **Gobierno carousel** (`#servicios`, slogan: "¡Te ayudamos a gobernar con inteligencia y efectividad!") and **Empresas carousel** (`#servicios-empresas`), both inline on the home page one after another, each fanning into the same 8 service categories, worded per audience:
  1. Hostess Virtuales (generative-AI voice/text agents, not chatbots — 24/7, multilingual, inbound+outbound)
  2. Neuropolítica (Gobierno) / Neurociencia aplicada a empresas (Empresas) — includes three measurement types: tracking emocional, tracking visual, tracking neuronal
  3. Recuperación de cartera vencida (Gobierno version adds "y pago de impuestos")
  4. Inteligencia de mercados y marketing político estratégico (Gobierno) / … y marketing estratégico (Empresas)
  5. Potencialización de programas gubernamentales (Gobierno) / … institucionales (Empresas) — geo-targeted mobile channels: image/carousel messages (Android only), robocall audio messages (60s, landline/mobile), full-screen "intrusive" mobile messages, 160-char SMS, CRM targeting
  6. Producción de video corporativo — identical copy for both audiences; real demo links exist (see Evidence)
  7. Estrategia y marketing digital — identical copy for both audiences; includes a domain-availability lookup tool
  8. Contact Center — identical copy for both audiences; explicit service list (see Evidence)

- **Domain-availability checker** (under Estrategia y Marketing Digital): the client wants a real WHOIS-backed lookup eventually, minimal-info ("disponible" / "ocupado" only). Confirmed 2026-08-26: build as a visual placeholder only in this pass; the live WHOIS integration (PHP is available via XAMPP) is a separate, later pass.
- Partner links (GIM Neuroscience, GIM Analytics external URLs): not yet available. Confirmed 2026-08-26: ship as placeholder (`#`) links with their descriptive copy in place; swap in real URLs when supplied.
- A large local `assets.zip` in the client's Downloads was confirmed 2026-08-26 as **not relevant** to this project — do not open or use it.
- Gobierno/Empresas hub pages use an accessible carousel (`js/script.js`, `[data-carousel]`): prev/next buttons, dot pagination, left/right arrow-key support, `aria-hidden` on inactive slides, transitions disabled under `prefers-reduced-motion`. No autoplay — matches the client's reference exactly (manual arrows only).

## Brand Commitments

- Legal/marketing name: **Grupo Interactiva México (GIM)**, described as "empresa 100% mexicana" — the client wants a "100% Mexican company" badge/seal somewhere on the site (no specific badge asset supplied yet).
- Tagline (from logo): "Comunicación | Branding | Marketing" — still valid, now understood as a subset of the full offering, not the whole of it.
- Brand red volunteered by the user: approximately `#DD0429`. Confirmed 2026-08-26 (separate from this deck): keep red **and** blue as a duo, modernized — do not drop blue.
- Real contact/social: phone `(477) 175-74-78`; Instagram `https://www.instagram.com/grupointeractiva/`; YouTube `https://www.youtube.com/channel/UCXUrs533jEMglj7IckZVP_w`.
- Existing logo assets: `assets/img/logo.png` (full color, for light backgrounds) and `assets/img/logo-white.png` (light/inverted, used site-wide in the header and footer since both sit on dark ink backgrounds).

## Evidence on Hand

- Logo: `assets/img/logo.png` (color) and `assets/img/logo-white.png` (inverted, in use).
- Demo/institutional reel: `assets/videos/DEMO GI 2020.mp4` — the client confirmed this doubles as the "video institucional de fondo" the hero should use.
- Real video-production demo links (slide 14, to embed/link as real proof, not placeholders): Comercial `https://youtu.be/g5IrSlNmylU`, Memoria `https://youtu.be/NwPRhsJQHp8`, Motion `https://youtu.be/BWVrorDiSXQ`, 360° `https://youtu.be/863RXrEk0SM`, Institucional `https://youtu.be/FSHOwPbjrDg`, and a general demo `https://youtu.be/0FQVRk6zcW0`.
- Real Contact Center service list (slide 16): encuestas telefónicas segmentadas (geográficas/electorales), branding/rebranding, validación y actualización de bases de datos, atención a clientes, recuperación de cartera vencida (cobranza extrajudicial), campañas dirigidas (bienvenida, apertura de sucursal, nuevos productos, fidelización, retención), renta de estaciones de call center, llamadas de confirmación, envíos masivos, telemarketing, ventas telefónicas.
- **Real design reference** (provided 2026-08-30): `Ginteractiva.pdf`, a single tall exported canvas showing Home → GIM Neuroscience/Analytics (full-bleed network-graphic background, staggered text blocks, "Leer más" links, centered "Conócenos" button) → Quiénes Somos (full-bleed photo background, centered copy with an inline bold-red highlight, two red pill CTAs "Gobierno servicios"/"Empresas servicios") → Gobierno/Empresas service carousels (arrows + dot pagination, one real image per slide). This is now the ground truth for these sections' structure, and the build matches it.
- **Real supplied photography/graphics**, all now in `assets/img/`, renamed to ASCII-safe filenames: `gim.jpg` (dark network/graph texture — Partners section background), `inicio.png` (B&W overhead desk photo — Quiénes Somos background), `quienes-somos.png` (B&W hand-with-stylus photo — Contacto section background), `hostess.png` (transparent-PNG robot — Hostess Virtuales carousel slides, both audiences), `neurociencias.png` (wireframe-brain render — Neurociencia aplicada a empresas slide), `neuropolitica.png` and `neuropolitica-2.png` (half-wireframe/half-solid brain renders — Neuropolítica slide uses the first; the second is in reserve, unused so far).
- The 3 remaining Gobierno/Empresas carousel slides without a supplied photo (Recuperación de cartera, Inteligencia de mercados, Potencialización de programas) use small authored line-art SVG icons in the brand red, not stock photography — keeps the same two-column slide layout without misrepresenting placeholder art as real photography.
- The deck's other images (eye-tracking heatmaps, EEG headsets, stock photography of people) are the client's own research/mood references pulled from web image searches — explicitly **not licensed assets**. Do not embed them in the site.
- No case studies, named clients, testimonials, press, or pricing have been supplied. Do not fabricate any of these; the existing "Cliente 01…06" placeholders stand until real logos arrive. No asset yet exists for the "empresa 100% mexicana" badge/seal the client mentioned — it currently renders as a text-only pill in the footer.

## Product Principles

1. Two audiences, one credibility bar — Gobierno and Empresas get separately worded paths, but both must land the same message: this is measured, not improvised.
2. Prove with the science, not the adjective — lean on the neuroscience/AI/data mechanism (GIM Neuroscience, GIM Analytics, generative-AI hostess) as the real differentiator, ahead of generic agency language.
3. Real proof over placeholder where it exists — the video-production demo links and the Contact Center service list are real; use them as-is rather than inventing softer placeholder copy in their place.
4. Low-friction path to contact — the root-level phone CTA and always-visible nav stay reachable from every page, audience hub, and service detail page.
5. Brand consistency — name, "Comunicación | Branding | Marketing" tagline, and the confirmed red+blue duo are fixed constraints for any visual work.

## Accessibility & Inclusion

No product-specific requirement established.
