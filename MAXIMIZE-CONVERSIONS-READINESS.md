# 716 Details — Maximize Conversions Readiness (Feb 26 Review)

## What Is Maximize Conversions?
Google's AI sets bids automatically to get the most conversions within your daily budget. Unlike Manual CPC, it uses auction-time signals (device, location, time, audience) to bid optimally per search.

## Prerequisites Checklist

### ✅ Must Have Before Switching
- [ ] **30+ conversions in last 30 days** — Google's AI needs data to learn. Without enough conversion history, it'll overspend on bad clicks.
- [ ] **Conversion tracking verified** — All conversion actions (calls, form fills) must be recording accurately. We had 26 click-to-calls but 0 recorded conversions as of Feb 22. THIS MUST BE FIXED FIRST.
- [ ] **Stable daily budget** — Don't change budget during the learning period (2 weeks). $60/day is fine.
- [ ] **Clean search terms** — Irrelevant searches waste the AI's budget. Week 1 negative keyword cleanup should be mostly done by Feb 26.

### ⚠️ Current Blockers
1. **Conversion tracking may be broken** — 26 click-to-calls, 0 recorded conversions. Need to verify:
   - Call conversion tracking threshold (is it set to count calls > 60 seconds?)
   - Google tag firing on /thank-you.html (was verified green, but check if forms actually redirect there)
   - Are form submissions being tracked as conversions?
2. **Not enough conversion data yet** — Campaigns went live Feb 19. Only 4 days of data by Feb 23. By Feb 26 we'll have 7 days, still probably under 30 conversions.

## Recommendation for Feb 26 Review
**Don't switch yet.** Here's why:
- Only 7 days of data, likely not enough conversions for the AI to learn properly
- Conversion tracking needs verification first
- Switching too early = Google burns through budget on bad signals

### Better Plan:
1. **Feb 26:** Fix conversion tracking, review search terms, add negatives
2. **March 5 (2 weeks in):** Review again with 2 weeks of clean data
3. **March 5-12:** If we have 30+ tracked conversions, switch to Maximize Conversions
4. **March 12-26:** Learning period (don't touch anything for 2 weeks)

## What to Check on Feb 26
1. Total conversions recorded (calls + forms)
2. Search terms report — any junk still getting through?
3. Ad CTR by campaign — any underperformers to pause?
4. Cost per click trends — are we paying too much?
5. Call extension performance
6. Geographic performance — any wasted spend outside service area?

## Key Google Docs Note
> "When using Maximize conversions without a Target CPA set, we'll aim to spend your budget to maximize conversions for your campaigns."

This means it WILL spend your full $60/day. No savings. The bet is it spends it smarter than manual bidding.
