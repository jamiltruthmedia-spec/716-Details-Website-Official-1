# 🧭 BREADCRUMB NAVIGATION TEMPLATES

**Last Updated:** September 20, 2025  
**Usage:** Copy-paste templates for consistent breadcrumb implementation

---

## 📋 **TEMPLATE 1: HOMEPAGE**
**Usage:** Not applicable - Homepage doesn't need breadcrumbs
**Status:** N/A

---

## 📋 **TEMPLATE 2: STANDARD SERVICES**
**Usage:** Most service pages (ceramic coating, window tinting, paint correction, etc.)

### **HTML Navigation:**
```html
<!-- Breadcrumb Navigation -->
<nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
        <ol class="breadcrumb-list">
            <li class="breadcrumb-item">
                <a href="index.html">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a href="index.html#services">Services</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                [SERVICE NAME]
            </li>
        </ol>
    </div>
</nav>
```

### **JSON-LD Schema:**
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
            "name": "[SERVICE NAME]",
            "item": "https://www.716detailing.com/[service-page].html"
        }
    ]
}
</script>
```

**Examples:**
- Ceramic Coating
- Window Tinting
- Paint Correction
- RV Detailing

---

## 📋 **TEMPLATE 3: MOBILE SERVICES**
**Usage:** Mobile-specific service pages

### **HTML Navigation:**
```html
<!-- Breadcrumb Navigation -->
<nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
        <ol class="breadcrumb-list">
            <li class="breadcrumb-item">
                <a href="index.html">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a href="index.html#services">Services</a>
            </li>
            <li class="breadcrumb-item">
                <span>Mobile Services</span>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                [MOBILE SERVICE NAME]
            </li>
        </ol>
    </div>
</nav>
```

**Examples:**
- Mobile Car Detailing
- Mobile Car Detailing Near Me

---

## 📋 **TEMPLATE 4: SPECIALTY SERVICES**
**Usage:** Fleet, dealership, luxury services

### **HTML Navigation:**
```html
<!-- Breadcrumb Navigation -->
<nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
        <ol class="breadcrumb-list">
            <li class="breadcrumb-item">
                <a href="index.html">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a href="index.html#services">Services</a>
            </li>
            <li class="breadcrumb-item">
                <span>Specialty Services</span>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                [SPECIALTY SERVICE NAME]
            </li>
        </ol>
    </div>
</nav>
```

**Examples:**
- Fleet Detailing
- Dealership Detailing
- Mobile Luxury Services
- Boat Detailing

---

## 📋 **TEMPLATE 5: LOCATION PAGES**
**Usage:** All location/area pages

### **HTML Navigation:**
```html
<!-- Breadcrumb Navigation -->
<nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
        <ol class="breadcrumb-list">
            <li class="breadcrumb-item">
                <a href="../index.html">Home</a>
            </li>
            <li class="breadcrumb-item">
                <a href="../index.html#areas">Service Areas</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                [CITY NAME]
            </li>
        </ol>
    </div>
</nav>
```

### **JSON-LD Schema:**
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
            "name": "[CITY NAME]",
            "item": "https://www.716detailing.com/locations/[city]-car-detailing.html"
        }
    ]
}
</script>
```

**Examples:**
- Clarence
- East Amherst
- Kenmore
- Lewiston

---

## 📋 **TEMPLATE 6: LEGAL PAGES**
**Usage:** Terms of Service, Privacy Policy

### **HTML Navigation:**
```html
<!-- Breadcrumb Navigation -->
<nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
        <ol class="breadcrumb-list">
            <li class="breadcrumb-item">
                <a href="index.html">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                [LEGAL PAGE NAME]
            </li>
        </ol>
    </div>
</nav>
```

**Examples:**
- Terms of Service
- Privacy Policy

---

## 🎯 **IMPLEMENTATION GUIDELINES:**

### **Placement:**
- Add breadcrumb HTML **after the hero section** and **before the first content section**
- Add breadcrumb schema **in the head section** after existing schemas

### **Customization:**
- Replace `[SERVICE NAME]`, `[CITY NAME]`, etc. with actual names
- Use proper capitalization (Title Case)
- Ensure URLs match actual file paths

### **Path References:**
- **Root pages:** Use `index.html`, `[page].html`
- **Location pages:** Use `../index.html`, `../[page].html`

### **Testing:**
- Verify all links work correctly
- Test on mobile and desktop
- Check breadcrumb styling matches site design

---

**READY FOR SYSTEMATIC ROLLOUT** 🚀







