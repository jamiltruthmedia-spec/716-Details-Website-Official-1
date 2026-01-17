# NAP CONSISTENCY FIX PLAN
## Ensure consistent Name, Address, Phone across all pages

---

## CURRENT NAP INFORMATION (VERIFIED):

### ✅ BUSINESS NAME:
**Consistent:** "716 Details" (appears 264 times)
**Status:** ✅ GOOD - Consistent across all pages

### ✅ PHONE NUMBER:
**Consistent:** "(716) 405-9988" and "+17164059988"
**Status:** ✅ GOOD - Consistent formatting

### ✅ ADDRESS (FOUND):
**Current:** 4689 Model City Rd, Lewiston, NY 14092
**Status:** ✅ GOOD - Found in homepage

---

## ISSUES TO FIX:

### 1. ADDRESS CONSISTENCY CHECK
**Action Needed:** Verify address appears consistently on ALL pages

**Standard Format:**
```
4689 Model City Rd
Lewiston, NY 14092
```

**Schema Format:**
```json
"address": {
    "@type": "PostalAddress",
    "streetAddress": "4689 Model City Rd",
    "addressLocality": "Lewiston", 
    "addressRegion": "NY",
    "postalCode": "14092",
    "addressCountry": "US"
}
```

### 2. PHONE NUMBER FORMAT STANDARDIZATION
**Current Variations Found:**
- `(716) 405-9988` (display format)
- `+17164059988` (schema format)
- `tel:7164059988` (link format)

**Standardize To:**
- **Display:** `(716) 405-9988`
- **Schema:** `+17164059988`
- **Links:** `tel:7164059988`

---

## PAGES TO AUDIT FOR NAP CONSISTENCY:

### SERVICE PAGES (14 pages):
- [ ] boat-detailing.html
- [ ] ceramic-coating.html  
- [ ] dealership-detailing.html
- [ ] exterior-detailing.html
- [ ] fleet-detailing.html
- [ ] full-detail.html
- [ ] interior-detailing.html
- [ ] mobile-car-detailing.html
- [ ] mobile-car-detailing-near-me.html
- [ ] mobile-luxury-services.html
- [ ] paint-correction.html
- [ ] rv-detailing.html
- [ ] window-tinting.html
- [ ] index.html ✅

### LOCATION PAGES (12 pages):
- [ ] locations/clarence-car-detailing.html
- [ ] locations/east-amherst-car-detailing.html
- [ ] locations/kenmore-car-detailing.html
- [ ] locations/lewiston-car-detailing.html
- [ ] locations/niagara-falls-car-detailing.html
- [ ] locations/north-tonawanda-car-detailing.html
- [ ] locations/ransomville-car-detailing.html
- [ ] locations/sanborn-car-detailing.html
- [ ] locations/wheatfield-car-detailing.html
- [ ] locations/williamsville-car-detailing.html
- [ ] locations/wilson-car-detailing.html
- [ ] locations/youngstown-car-detailing.html

### LEGAL PAGES (2 pages):
- [ ] terms-of-service.html
- [ ] privacy-policy.html

---

## IMPLEMENTATION STEPS:

### STEP 1: AUDIT CURRENT NAP
```bash
# Check business name consistency
grep -r "716 Details" . --include="*.html" | grep -v "716 Details" | wc -l

# Check phone number variations  
grep -r "716.*405.*0316" . --include="*.html" | head -10

# Check address consistency
grep -r "4689 Model City Rd" . --include="*.html" | wc -l
grep -r "Lewiston, NY 14092" . --include="*.html" | wc -l
```

### STEP 2: STANDARDIZE CONTACT SECTIONS
**Template for all pages:**
```html
<div class="contact-info">
    <h3>Contact 716 Details</h3>
    <p><strong>Address:</strong><br>
    4689 Model City Rd<br>
    Lewiston, NY 14092</p>
    
    <p><strong>Phone:</strong><br>
    <a href="tel:7164059988">(716) 405-9988</a></p>
    
    <p><strong>Email:</strong><br>
    <a href="mailto:info@716detailing.com">info@716detailing.com</a></p>
</div>
```

### STEP 3: UPDATE SCHEMA MARKUP
**Consistent schema for all pages:**
```json
{
    "@type": "LocalBusiness",
    "name": "716 Details",
    "telephone": "+17164059988",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "4689 Model City Rd",
        "addressLocality": "Lewiston",
        "addressRegion": "NY", 
        "postalCode": "14092",
        "addressCountry": "US"
    }
}
```

### STEP 4: UPDATE META DESCRIPTIONS
**Ensure consistent business name in all meta descriptions:**
```html
<meta name="description" content="[Service] in Lewiston NY | 716 Details | [Description]. Call (716) 405-9988">
```

---

## VERIFICATION CHECKLIST:

### ✅ BUSINESS NAME CONSISTENCY:
- [ ] All pages show "716 Details" (not variations)
- [ ] Schema markup uses exact name
- [ ] Meta titles include "716 Details"
- [ ] Footer shows consistent business name

### ✅ ADDRESS CONSISTENCY:
- [ ] All contact sections show full address
- [ ] Schema markup has complete address
- [ ] Footer includes address
- [ ] Location pages reference main address

### ✅ PHONE NUMBER CONSISTENCY:
- [ ] Display format: (716) 405-9988
- [ ] Link format: tel:7164059988  
- [ ] Schema format: +17164059988
- [ ] All clickable phone numbers work

### ✅ EMAIL CONSISTENCY:
- [ ] All pages use same email format
- [ ] Schema markup includes email
- [ ] Contact forms send to correct email
- [ ] Footer shows consistent email

---

## EXPECTED SEO BENEFITS:

### LOCAL SEO IMPROVEMENTS:
- **Better Google My Business integration**
- **Improved local search rankings**
- **Consistent citation building**
- **Enhanced trust signals**

### TECHNICAL SEO BENEFITS:
- **Cleaner schema markup**
- **Better crawling and indexing**
- **Improved local pack rankings**
- **Enhanced rich snippets**

---

## PRIORITY ACTIONS:

### 🔥 IMMEDIATE (High Impact):
1. Verify address appears on ALL pages
2. Standardize phone number formats
3. Update schema markup consistency
4. Fix any NAP variations found

### ⚡ SHORT-TERM (Medium Impact):
1. Add email to all contact sections
2. Ensure footer consistency
3. Update meta description formats
4. Verify all contact links work

### 📈 ONGOING (Maintenance):
1. Regular NAP audits
2. Monitor citation consistency
3. Update schema as business grows
4. Maintain format standards

This plan ensures your NAP information is perfectly consistent across all pages, boosting local SEO rankings and building trust with both users and search engines.


