# 716 Landing Pages — P1 Fix List

## Status: Ready to implement after P0 merge

These are conversion-impacting improvements identified during the 8-agent audit (Feb 23). Not broken, but leaving money on the table.

---

### 1. Form Submit Button Text
**Current:** "Continue"
**Should be:** "Get My Free Quote" or "Get Your Free Quote"
**Why:** Generic "Continue" has lower conversion rates than action-specific CTAs. Studies show specific button text improves form completion 10-20%.
**File:** Both pages, inside the GHL iframe — this may need to be changed in GHL form settings, not in HTML.
**Effort:** 2 min in GHL

### 2. Mobile Hero Simplification
**Current:** Hero has headline + subheadline + trust badges + gallery + form all competing for attention
**Should be:** Reduce to: headline + one CTA + trust badges. Move gallery below the fold.
**Why:** Too many competing elements on mobile = decision paralysis. Users should see one clear action.
**File:** `landing/car-detailing.html` and `landing/ceramic-coating.html` — hero section
**Effort:** 30-60 min

### 3. Trust Badge / Secondary Text Sizing
**Current:** 13px after P0+UX fixes (was 12px)
**Should be:** 14px minimum for trust lines, badge text
**Why:** Trust signals only work if people can read them. 13px is still small on mobile.
**File:** Both pages, `.trust-line` and badge styles
**Effort:** 10 min

### 4. Add `width` and `height` to All Images
**Current:** Images have no explicit dimensions
**Should be:** Add width/height attributes matching actual image dimensions
**Why:** Prevents Cumulative Layout Shift (CLS) — a Core Web Vital. Google penalizes high CLS.
**File:** Both pages, all `<img>` tags
**Effort:** 20 min (need to check actual image dimensions first)

### 5. Sticky Mobile CTA Bar (Ceramic Coating Page)
**Current:** Car detailing has a sticky bottom bar, ceramic coating doesn't
**Should be:** Add matching sticky CTA bar to ceramic coating page
**Why:** Users scrolling through 3 coating packages need an always-visible "Get Quote" action
**File:** `landing/ceramic-coating.html`
**Effort:** 15 min (copy pattern from car-detailing)

### 6. Per-Package CTA Buttons (Ceramic Coating)
**Current:** Package cards are clickable links to the form, but no visible CTA button
**Should be:** Add "Get Quote" button at bottom of each package card
**Why:** Cards need an explicit call-to-action. Not everyone realizes the whole card is clickable.
**File:** `landing/ceramic-coating.html` — `.service-card` elements
**Effort:** 20 min

### 7. PageSpeed / Core Web Vitals Audit
**Current:** No performance testing done
**Should be:** Run PageSpeed Insights, target 90+ mobile score
**Why:** Page speed directly impacts ad Quality Score and conversion rates
**Effort:** Run test first, then fix what it flags (could be 30 min to 2 hours)

---

## Implementation Order (Recommended)
1. Form button text (biggest conversion impact, easiest fix)
2. Sticky CTA bar on ceramic coating
3. Per-package CTA buttons
4. Image dimensions (CLS fix)
5. Trust badge sizing
6. Mobile hero simplification (most complex)
7. PageSpeed audit (run after all fixes)

## Notes
- P0 fixes (branch `fix/landing-page-p0-issues`) should merge FIRST
- UX fixes (branch `fix/ux-audit-improvements`) rebased on top
- THEN P1 fixes as a new branch
- Form button text is a GHL change, not a code change
