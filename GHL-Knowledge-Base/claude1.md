# Instructions for Creating Go High Level Knowledge Base

Use this prompt to create a complete AI knowledge base for any business.

---

## PROMPT TO COPY:

I need you to scan my business website and create a complete Go High Level AI Knowledge Base.

My website: [INSERT WEBSITE URL HERE]

Create these 5 files:
1. Company-Overview.docx
2. Services-and-Pricing.docx
3. Services-and-Pricing.csv
4. FAQs.docx
5. Brand-Voice-Guidelines.docx

---

## REQUIREMENTS:

### Company-Overview.docx
- What the business does
- Who they serve (target customers)
- Service area (cities, counties, radius)
- Business mission statement
- What makes them different from competitors
- Contact information
- NO markdown syntax (no ##, **, ---, emojis)

### Services-and-Pricing.docx
- All services with descriptions
- Pricing for each service
- Time requirements
- What's included
- How to quote prices
- NO markdown syntax

### Services-and-Pricing.csv
- List EVERY service package separately
- If service has different sizes (sedan/SUV/truck), list each as separate row
- If service has tiers (basic/premium), list each as separate row
- Column structure: Service Name, Service Category, Price, Duration, Service Location, Size/Type, Notes
- All columns should be STRING type in GHL
- Use "N/A" instead of empty cells
- Make it searchable with natural language

### FAQs.docx
- 40+ common questions organized by category
- Pricing questions
- Service area questions
- Service details
- Booking questions
- Clean answers with NO trailing questions like "What would you like?" or "When works for you?"
- Just provide information, don't ask questions back
- NO markdown syntax

### Brand-Voice-Guidelines.docx
- How to communicate (professional yet friendly)
- Phone call scripts
- SMS/text message templates
- Words to use and avoid
- Objection handling
- Upselling phrases
- NO markdown syntax

---

## CRITICAL RULES:

1. Scan EVERY service page on the website
2. Find ALL pricing packages and tiers
3. List every size variation separately (sedan $X, SUV $Y, truck $Z)
4. NO markdown in DOCX files (##, **, ---, emojis must be removed)
5. CSV must have descriptive column names for AI semantic search
6. All prices must match website exactly
7. FAQs should be clean statements, not questions

---

## EXAMPLE CSV FORMAT:

Service Name,Service Category,Price,Duration,Service Location,Vehicle Size,Notes
Full Detail - Sedan,Full Detail,$290,3-4 hours,Mobile or In-Shop,Sedan,Complete interior and exterior
Full Detail - SUV,Full Detail,$320,3-4 hours,Mobile or In-Shop,SUV,Complete interior and exterior

---

## WHAT TO CHECK:

- Every service on website is in CSV
- Every package tier is listed separately
- All size variations included
- No markdown in DOCX files
- All prices accurate
- CSV has 10+ columns
- FAQs cover all services

---

Save this file and use the prompt above for any business website.






