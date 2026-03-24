

# Fix Plan: Fonts, Challenge Mapping & Section C

## Problem Summary
1. **Fonts revert** because `font-family` is inside `@layer base` (lowest CSS specificity) -- Tailwind reprocessing or HMR overwrites it
2. **"Multi-geography resource management"** categorized as Scale & Governance in Slide 3 but solved in Section A Delivery Solutions -- inconsistent
3. **Section C** doesn't clearly show which Slide 3 challenges it addresses
4. **15 challenges** lack a clear traceability map showing where each is resolved

## Changes

### 1. Fix Font Stability (`src/index.css`)
Move `body` and heading `font-family` declarations **outside** `@layer base` so they cannot be overridden by Tailwind layer specificity. Place them as top-level rules after the Tailwind directives.

### 2. Fix Challenge Categorization (`ChallengeSlide.tsx`)
Move "Multi-geography resource coordination" from Scale & Governance into Delivery (it becomes the 6th delivery challenge, matching the original scenario which lists it under "Delivery Issues"). Scale & Governance keeps 3 items. Update counts accordingly: Delivery = 6, Security = 6, Scale & Governance = 3. Total still 15.

### 3. Add Challenge Traceability to Slide 3 (`ChallengeSlide.tsx`)
Below the 3-column grid, add a compact visual mapping strip showing:
- Delivery (6) → Addressed in Section A (Slides 5, 8)
- Security (6) → Addressed in Section B (Slides 4, 6)
- Scale & Governance (3) → Addressed in Sections A+C (Slides 7, 8, 9)

This is a small colored bar with labels, not a table.

### 4. Enhance Section C (`SecurityAnalysisSlide.tsx`)
Add a "Scale & Governance Challenges Addressed" section at the top, with 3 compact cards mapping:
- Legacy monolith → microservices: API-driven architecture enables AAP/Bot Manager per-service
- Acquired companies migration: Security posture standardization via golden templates
- Cross-team change management: RACI + training + Config-as-Code

Keep the existing security interrelation diagram below it. This gives Section C both the required security analysis AND the explicit challenge coverage the user wants.

### Files Modified
- `src/index.css` -- font declarations moved outside `@layer base`
- `src/components/slides/ChallengeSlide.tsx` -- move multi-geo to Delivery, add traceability strip
- `src/components/slides/SecurityAnalysisSlide.tsx` -- add Scale & Governance mapping section

