

# AT Retailers - Akamai Panel Interview Presentation

## Overview
A visually rich, presentation-style scrollable web app with Akamai brand colors, designed to print cleanly as a PDF. Each "slide" is a full-viewport section. Heavy on diagrams, icons, and visual architecture -- minimal text blocks. Clickable callout modals for deeper detail.

## Akamai Brand Colors
- Primary Blue: `#009BDE` (Akamai signature)
- Dark Navy: `#003B5C`
- White: `#FFFFFF`
- Accent Orange: `#FF6B35` (for highlights/callouts)
- Light Gray: `#F5F7FA` (alternating backgrounds)

## Slide Structure (10 sections, each ~100vh)

### Slide 1: Title
- Your name, title, "AT Retailers Digital Transformation" subtitle
- Akamai logo styling, date, panel context
- Subtle animated gradient background

### Slide 2: The Challenge at a Glance
- Visual summary: 3 icon cards (Delivery | Security | Scale)
- Key stats: 5,000 hostnames, 30 days, 5x traffic surge, global regions
- Clickable modal on each card for deeper problem statement

### Slide 3: Architecture Overview (Hero Diagram)
- Full visual: Origin (AWS + On-Prem) → Akamai Edge → End Users
- Shows Ion/DSA for delivery, Image & Video Manager, SureRoute
- Color-coded layers: Delivery (blue), Security (orange), Compute (green)
- Clickable hotspots on each Akamai product for modal with best practice

### Slide 4: Delivery Strategy
- Visual cards for each solution:
  - **Ion** (dynamic acceleration + caching)
  - **Image & Video Manager** (auto-optimization)
  - **Global Traffic Management** (multi-geo routing)
  - **Property Manager bulk API** (5,000 hostname onboarding via templates + API)
  - **mPulse** (RUM monitoring)
- Callout modal: "How to onboard 5,000 hostnames in 30 days" (template-based config, bulk API, phased DNS cutover)

### Slide 5: Security Architecture
- Layered defense diagram (visual, not text):
  - Layer 1: DDoS (Prolexic / Site Shield)
  - Layer 2: WAF (App & API Protector - AAP)
  - Layer 3: Bot Manager Premier
  - Layer 4: API Security
- Each layer is clickable for modal with best practice + competitive advantage

### Slide 6: Bot & Threat Deep Dive
- Visual attack flow: Bot → Edge Detection → Response
- Icons for each threat type: credential stuffing, scraping, carding
- Side-by-side: "Without Akamai" vs "With Akamai"
- Callout: sophisticated evasion handling (behavioral analysis, device fingerprinting)

### Slide 7: 30-Day Project Roadmap
- Visual Gantt-style timeline with 4 phases:
  - Week 1: Discovery & Assessment (audit existing configs, stakeholder mapping)
  - Week 2: Foundation (template creation, bulk onboarding wave 1, WAF baseline)
  - Week 3: Scale (waves 2-4, bot manager rollout, testing in staging despite customer preference)
  - Week 4: Hardening & Go-Live (optimization, monitoring, handoff)
- Color-coded swim lanes: Delivery, Security, Training, Governance

### Slide 8: Risk Management & Change Control
- Visual risk matrix (impact vs likelihood grid)
- Top 5 risks as cards with mitigation strategies
- Key risk: "Customer says no testing" → mitigation approach (phased rollout, canary deployments, rollback plan)
- RACI chart as a compact visual table
- Escalation path diagram

### Slide 9: Akamai Competitive Advantages
- Visual comparison cards (not a table):
  - Largest edge network (4,200+ PoPs)
  - Integrated security + delivery (single pane)
  - Bot Manager behavioral AI vs competitors' signature-only
  - EdgeWorkers for custom logic at edge
  - Terraform/API-first for automation at scale
- Each card with an icon and one-line differentiator

### Slide 10: Summary & Q&A
- Recap visual: 3 pillars achieved (Delivery, Security, Scale)
- "Thank You" with contact info placeholder
- Glossary button → opens modal with Akamai product glossary

## Interactive Elements
- **Clickable callout badges** on diagrams → open Dialog modals with detail text
- **Glossary modal** at the end with all Akamai products referenced
- **Print styles**: `@media print` with proper page breaks after each slide section, hide modal triggers, show all content inline

## Technical Implementation
- Single `Index.tsx` page with section components
- Each slide is a React component in `src/components/slides/`
- Shared `SlideLayout` wrapper for consistent sizing and print breaks
- Dialog modals for callouts using existing shadcn Dialog
- Lucide icons throughout for visual weight
- Recharts for any data viz (risk matrix, traffic charts)
- CSS: `@media print { .slide { page-break-after: always; } }` for clean PDF export
- Navigation dots on the side for quick jumping between slides

## Files to Create/Edit
1. `src/index.css` - Akamai brand CSS variables + print styles
2. `src/components/slides/SlideLayout.tsx` - Wrapper with consistent styling
3. `src/components/slides/TitleSlide.tsx`
4. `src/components/slides/ChallengeSlide.tsx`
5. `src/components/slides/ArchitectureSlide.tsx`
6. `src/components/slides/DeliverySlide.tsx`
7. `src/components/slides/SecuritySlide.tsx`
8. `src/components/slides/BotThreatSlide.tsx`
9. `src/components/slides/RoadmapSlide.tsx`
10. `src/components/slides/RiskSlide.tsx`
11. `src/components/slides/CompetitiveSlide.tsx`
12. `src/components/slides/SummarySlide.tsx`
13. `src/components/slides/GlossaryModal.tsx`
14. `src/components/SlideNav.tsx` - Side dot navigation
15. `src/pages/Index.tsx` - Compose all slides

