# 📦 Component Architecture Overview

## Component Hierarchy After Refactoring

```
src/components/
│
├── shared/
│   └── section-components.jsx
│       ├── SectionHeader (title, subtitle, centered)
│       ├── SectionWrapper (children, bgColor, className)
│       └── AnimatedContainer (children, delay, ...props)
│
├── ui/
│   ├── button.jsx (shadcn)
│   ├── card.jsx (shadcn)
│   ├── input.jsx (shadcn)
│   ├── textarea.jsx (shadcn)
│   ├── dropdown-menu.jsx (shadcn)
│   ├── navigation-menu.jsx (shadcn)
│   ├── carousel.jsx (shadcn)
│   ├── sheet.jsx (shadcn)
│   ├── form-handler.jsx (Custom hook)
│   └── get-in-touch-form.jsx (Reusable form component)
│
├── layout/
│   ├── navbar/
│   │   ├── Navbar.jsx (Main - handles desktop/mobile toggle)
│   │   ├── NavbarLogo.jsx (Logo with icon badge)
│   │   ├── NavbarMenuItem.jsx (Individual menu item wrapper)
│   │   └── NavbarMegaMenu.jsx (Dropdown with animations)
│   │
│   ├── footer/
│   │   ├── Footer.jsx (Main - gradient background)
│   │   ├── FooterSection.jsx (Generic list section)
│   │   ├── FooterContact.jsx (Contact details)
│   │   └── FooterAddress.jsx (Manufacturing & corporate addresses)
│   │
│   ├── topstrip/
│   │   └── Topbar.jsx
│   │
│   └── pageLayout/
│       └── pageLayout.jsx (Page wrapper with PageLayout.Container)
│
├── home/
│   ├── hero/
│   │   └── Hero.jsx (Auto-sliding carousel with motion)
│   │
│   ├── about/
│   │   ├── About.jsx (Main container)
│   │   ├── AboutImage.jsx (Image with hover scale)
│   │   └── AboutContent.jsx (Title + description + highlights)
│   │
│   ├── products/
│   │   ├── Products.jsx (Main - coordinates segments)
│   │   └── ProductSegmentCard.jsx (Individual segment card)
│   │
│   ├── services/
│   │   └── Services.jsx
│   │
│   ├── associates/
│   │   └── OurAssociates.jsx
│   │
│   ├── certificate/
│   │   └── Certificate.jsx
│   │
│   ├── globalpresence/
│   │   ├── GlobalPresence.jsx (Main container)
│   │   ├── GlobalPresenceContent.jsx (Left side - info + brochures)
│   │   └── GlobalPresenceForm.jsx (Right side - contact form)
│   │
│   └── globalpresence/
│       └── GlobalPresence.jsx
│
├── about/
│   ├── mission/
│   │   ├── Mission.jsx (Main - 3-column layout)
│   │   └── MissionCard.jsx (Mission/Vision/Values card)
│   │
│   ├── certifications/
│   │   ├── Certifications.jsx (Main container)
│   │   └── CertificateCard.jsx (Individual certificate with image)
│   │
│   ├── coreTeam/
│   │   ├── CoreTeam.jsx (Main container)
│   │   └── TeamMemberCard.jsx (Individual team member profile)
│   │
│   ├── corporate/
│   │   └── CorporateProfile.jsx
│   │
│   └── associates/
│       ├── OurAssociates.jsx (Main container)
│       └── AssociateCard.jsx (Individual associate logo card)
│
├── products/
│   ├── Products.jsx (Main - search + filter + table)
│   ├── ProductFilters.jsx (Search input + segment dropdown)
│   ├── ProductTableRow.jsx (Individual product table row)
│   ├── ProductDetails.jsx (Detail page with enquiry form)
│   ├── ProductImageSection.jsx (Product image container)
│   ├── ProductInfo.jsx (Product details - name, brand, segment, description)
│   └── ProductsRangeSlider.jsx (Optional range filter)
│
└── pages/
    └── Home.jsx (Main page wrapper)
```

## Data Structure Hierarchy

```
src/data/
│
├── home/
│   ├── hero.data.js → HERO_SLIDER_DATA
│   ├── about.data.js → ABOUT_DATA
│   ├── products.data.js → PRODUCT_SEGMENTS_DATA
│   ├── globalPresence.data.js → GLOBAL_PRESENCE_DATA
│   ├── ourServices.data.js → SERVICES_DATA
│   ├── associates.data.js → ASSOCIATES_DATA
│   ├── certificates.data.js → CERTIFICATES_DATA
│   └── chairman.data.js → CHAIRMAN_DATA
│
├── about/
│   ├── mission.data.js → missionData
│   ├── certifications.data.js → CERTIFICATIONS_DATA
│   ├── coreTeam.data.js → CORE_TEAM_DATA
│   ├── ourAssociates.data.js → OUR_ASSOCIATES_DATA
│   └── corporateProfile.data.js → CORPORATE_PROFILE_DATA
│
├── products/
│   └── products.data.js → PRODUCTS_DATA
│
└── layout/
    ├── navbar.data.js → NAVBAR_DATA
    ├── footer.data.js → FOOTER_DATA
    └── topbar.data.js → TOPBAR_DATA
```

## Component Prop Interfaces

### Reusable Components

**SectionHeader**
```jsx
<SectionHeader 
  title="string"
  subtitle="string (optional)"
  centered={boolean}
/>
```

**SectionWrapper**
```jsx
<SectionWrapper 
  children={ReactNode}
  className="string (optional)"
  bgColor="string (default: bg-white)"
/>
```

**AnimatedContainer**
```jsx
<AnimatedContainer 
  children={ReactNode}
  delay={number}
  {...motionProps}
/>
```

**ProductSegmentCard**
```jsx
<ProductSegmentCard 
  segment={{ image, name, description }}
  index={number}
/>
```

**MissionCard**
```jsx
<MissionCard 
  section={{ icon, title, points }}
  index={number}
/>
```

**ProductTableRow**
```jsx
<ProductTableRow 
  product={{ name, brand, description, segment }}
  slug="string"
  index={number}
/>
```

**CertificateCard**
```jsx
<CertificateCard 
  certificate={{ image, name, description }}
  index={number}
/>
```

**TeamMemberCard**
```jsx
<TeamMemberCard 
  member={{ image, name, position, experience, bio }}
  index={number}
/>
```

**AssociateCard**
```jsx
<AssociateCard 
  associate={{ logo, name, category }}
  index={number}
/>
```

## Animation Patterns Used

### Entry Animations
```jsx
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```

### Staggered List Items
```jsx
transition={{ delay: index * 0.08 }}
```

### Hover Effects
```jsx
whileHover={{ y: -6, scale: 1.05 }}
```

### Tap Effects (Buttons)
```jsx
whileTap={{ scale: 0.98 }}
```

### Image Hover
```jsx
whileHover={{ scale: 1.10 }}
transition={{ duration: 0.5 }}
```

## Responsive Breakpoints Used

| Breakpoint | Size | Usage |
|-----------|------|-------|
| mobile (default) | 320px-639px | Base styles |
| sm | 640px-767px | Tablet portrait |
| md | 768px-895px | Tablet landscape |
| lg | 896px-1279px | Desktop |
| xl | 1280px+ | Wide desktop |

## Key Styling Patterns

### Typography Scale
```
Mobile: text-sm (14px)
↓
Tablets: sm:text-base (16px)
↓
Desktop: lg:text-lg (18px)
↓
Large screens: lg:text-2xl/3xl/4xl (24px-36px)
```

### Spacing Scale
```
Mobile: px-4 py-4
↓
Tablets: sm:px-6 sm:py-6
↓
Desktop: lg:px-8 lg:py-8
↓
Gaps: gap-6 lg:gap-8 lg:gap-12
```

### Grid Layout
```
1 column (mobile)
↓
2 columns (sm:grid-cols-2)
↓
3-4 columns (lg:grid-cols-3/4)
```

## Form Handling Pattern

All forms now follow this pattern:

```jsx
const [form, setForm] = useState({});
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);
  // Submit logic
  setTimeout(() => {
    alert("Success message");
    setForm({});
    setLoading(false);
  }, 500);
};
```

## Performance Optimizations

1. **Component Splitting** - Reduces re-renders
2. **Lazy Loading** - Images with object-cover
3. **Viewport Animations** - Only animate when visible
4. **Responsive Images** - Proper sizing per breakpoint
5. **CSS Classes** - Tailwind utility classes (no CSS-in-JS overhead)

---

**Total Components:** 50+ reusable, organized components  
**Build Size:** ~480KB (gzip: 153KB)  
**Dev Server:** Running on http://localhost:5174/
