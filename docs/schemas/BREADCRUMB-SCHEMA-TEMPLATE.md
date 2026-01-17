# 🗂️ BREADCRUMB SCHEMA TEMPLATES

**Last Updated:** September 20, 2025  
**Usage:** JSON-LD breadcrumb schemas for different page types

---

## 📋 **LOCATION PAGES SCHEMA**

### **Template:**
```json
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.716detailing.com/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Service Areas",
            "item": "https://www.716detailing.com/#areas"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "[CITY_NAME]",
            "item": "https://www.716detailing.com/locations/[city-name]-car-detailing.html"
        }
    ]
}
</script>
```

### **Missing Location Pages (8 total):**
1. **Ransomville:** Replace `[CITY_NAME]` with `Ransomville`, `[city-name]` with `ransomville`
2. **Sanborn:** Replace `[CITY_NAME]` with `Sanborn`, `[city-name]` with `sanborn`
3. **Youngstown:** Replace `[CITY_NAME]` with `Youngstown`, `[city-name]` with `youngstown`
4. **Wilson:** Replace `[CITY_NAME]` with `Wilson`, `[city-name]` with `wilson`
5. **Lewiston:** Replace `[CITY_NAME]` with `Lewiston`, `[city-name]` with `lewiston`
6. **Wheatfield:** Replace `[CITY_NAME]` with `Wheatfield`, `[city-name]` with `wheatfield`
7. **North Tonawanda:** Replace `[CITY_NAME]` with `North Tonawanda`, `[city-name]` with `north-tonawanda`
8. **Niagara Falls:** Replace `[CITY_NAME]` with `Niagara Falls`, `[city-name]` with `niagara-falls`

---

## 📋 **SERVICE PAGES SCHEMA**

### **Standard Services Template:**
```json
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.716detailing.com/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.716detailing.com/#services"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "[SERVICE_NAME]",
            "item": "https://www.716detailing.com/[service-page].html"
        }
    ]
}
</script>
```

### **Specialty Services Template:**
```json
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.716detailing.com/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.716detailing.com/#services"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Specialty Services",
            "item": "https://www.716detailing.com/#services"
        },
        {
            "@type": "ListItem",
            "position": 4,
            "name": "[SPECIALTY_SERVICE_NAME]",
            "item": "https://www.716detailing.com/[service-page].html"
        }
    ]
}
</script>
```

---

## 📋 **LEGAL PAGES SCHEMA**

### **Template:**
```json
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.716detailing.com/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "[LEGAL_PAGE_NAME]",
            "item": "https://www.716detailing.com/[legal-page].html"
        }
    ]
}
</script>
```

---

## 🎯 **IMPLEMENTATION GUIDELINES:**

### **Placement:**
- Add in the `<head>` section
- After existing LocalBusiness schema (if present)
- Before closing `</head>` tag

### **Customization:**
- Replace bracketed placeholders with actual values
- Use proper capitalization for names
- Ensure URLs match actual file paths
- Use consistent naming with HTML breadcrumbs

### **Validation:**
- Test with Google's Rich Results Test
- Verify schema appears in search results
- Check for JSON syntax errors

---

## 📊 **EXPECTED BENEFITS:**

### **SEO Impact:**
- **Rich Snippets:** Breadcrumb paths in search results
- **Better Crawling:** Clearer site structure for search engines
- **Enhanced SERP:** More attractive search result listings

### **User Experience:**
- **Clear Navigation:** Visual breadcrumb path in search
- **Trust Signals:** Professional appearance in SERPs
- **Quick Navigation:** Easy path understanding

---

## 🚨 **QUALITY CHECKLIST:**

### **Before Implementation:**
- [ ] Verify page doesn't already have breadcrumb schema
- [ ] Check existing schema structure
- [ ] Confirm URL paths are correct

### **After Implementation:**
- [ ] Validate JSON syntax
- [ ] Test with Rich Results Test tool
- [ ] Verify no duplicate schemas
- [ ] Check breadcrumb appears correctly

---

**READY FOR SYSTEMATIC IMPLEMENTATION** 🗂️







