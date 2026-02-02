# 🚀 Quick Reference Guide - Refactored Components

## What Changed?

### ✅ Before Refactoring
- Long component files (60-120+ lines)
- Mixed concerns (layout + content + styling)
- Limited reusability
- Inconsistent animations
- Basic responsive design

### ✅ After Refactoring
- Focused components (20-40 lines max)
- Single responsibility principle
- Highly reusable shared components
- Consistent Framer Motion animations
- Full responsive design (mobile-first)
- Easier to test and maintain

---

## 📱 Responsive Design Cheat Sheet

### Navigation Bar
- **Mobile:** Logo + hamburger menu
- **Desktop:** Logo + full navigation + mega menus

### Sections
- **Mobile:** Single column, full width
- **Tablet:** 2 columns
- **Desktop:** 3-4 columns (varies by section)

### Images
- **Mobile:** h-32 sm:h-40 lg:h-48 lg:h-56 lg:h-64
- **Auto-scale:** object-cover for backgrounds
- **Hover:** scale-110 on desktop

### Typography
- **Mobile:** text-sm (14px)
- **Tablet:** sm:text-base (16px)  
- **Desktop:** lg:text-lg (18px)
- **Large:** lg:text-xl lg:text-2xl lg:text-3xl lg:text-4xl

### Padding/Margins
- **Mobile:** px-4 py-4
- **Tablet:** sm:px-6 sm:py-6
- **Desktop:** lg:px-8 lg:py-8
- **Gaps:** gap-6 lg:gap-8 lg:gap-12

---

## 🎬 Animation Patterns

### Page Entry (Top-Level Components)
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
```

### Scroll-Triggered (Cards/Items)
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
```

### Staggered Lists
```jsx
transition={{ delay: index * 0.08 }}
```

### Hover Effects
```jsx
whileHover={{ y: -6, scale: 1.05 }}
```

---

## 🛠️ How to Use Shared Components

### SectionHeader
```jsx
import { SectionHeader } from "@/components/shared/section-components";

<SectionHeader
  title="Our Core Values"
  subtitle="Guiding principles that drive excellence"
  centered
/>
```

### SectionWrapper
```jsx
import { SectionWrapper } from "@/components/shared/section-components";

<SectionWrapper bgColor="bg-blue-50">
  {children}
</SectionWrapper>
```

### ProductSegmentCard
```jsx
import ProductSegmentCard from "@/components/home/products/ProductSegmentCard";

{segments.map((segment, i) => (
  <ProductSegmentCard key={i} segment={segment} index={i} />
))}
```

---

## 📂 File Organization

### To Add a New Page:
1. Create folder: `src/components/pages/YourPage/`
2. Create data file: `src/data/pages/yourPage.data.js`
3. Create components:
   - `YourPage.jsx` (main container)
   - `YourPageContent.jsx` (if needed)
   - `YourPageCard.jsx` (for list items)

### To Add a New Card Type:
1. Create in appropriate section folder
2. Import motion components
3. Add animations pattern
4. Use responsive classes

### To Edit Styling:
1. All styling uses Tailwind classes
2. Follow responsive pattern: base → sm: → lg:
3. Use consistent spacing from spacing scale
4. Apply motion/hover effects consistently

---

## 🔍 Common Customizations

### Change Card Height
```jsx
// Before
<div className="h-40">

// After
<div className="h-32 sm:h-40 lg:h-48 lg:h-56">
```

### Change Background Color
```jsx
// In SectionWrapper
<SectionWrapper bgColor="bg-gray-50">

// Available: bg-white, bg-gray-50, bg-blue-50, etc.
```

### Adjust Animation Delay
```jsx
// Stagger speed (lower = faster spacing)
transition={{ delay: index * 0.06 }} // Faster
transition={{ delay: index * 0.10 }} // Slower
```

### Make Section Wider/Narrower
```jsx
// In PageLayout
<div className="max-w-7xl"> {/* Change to max-w-6xl or max-w-screen-xl */}
```

---

## ✨ Component Features Checklist

### Every Card Component Has:
- ✅ Entry animation (opacity + slide)
- ✅ Hover effect (lift + scale)
- ✅ Responsive sizing
- ✅ Consistent spacing
- ✅ Shadow effects
- ✅ Color scheme (blue-600 primary)

### Every Page Has:
- ✅ PageLayout wrapper
- ✅ SectionHeader with title
- ✅ Responsive grid layout
- ✅ Staggered animations
- ✅ Mobile-first design
- ✅ Proper typography hierarchy

### Every Form Has:
- ✅ State management
- ✅ Input validation
- ✅ Loading state
- ✅ Success message
- ✅ Error handling (optional)
- ✅ Auto-reset after submit

---

## 🐛 Common Issues & Solutions

### Animation Not Working?
```jsx
// Check viewport prop
whileInView={{ ... }}
viewport={{ once: true }}

// Check that component is actually scrolled into view
```

### Responsive Not Working?
```jsx
// Check breakpoint order
text-sm sm:text-base md:text-lg lg:text-xl

// Never skip breakpoints (go in order)
```

### Form Not Submitting?
```jsx
// Check loading state isn't blocking
disabled={loading}

// Check setTimeout is allowing submit to complete
setTimeout(() => { setLoading(false) }, 500);
```

### Images Not Showing?
```jsx
// Check path is correct
src="/products/image-name.jpg"

// Check image exists in public folder
public/products/image-name.jpg
```

---

## 📊 Performance Tips

1. **Use `whileInView` instead of `animate`** - Only animate when visible
2. **Limit animation duration** - Keep to 0.3-0.5s
3. **Use `once: true` in viewport** - Animation only once
4. **Lazy load images** - Use object-cover with proper sizing
5. **Don't animate on every render** - Use key props correctly

---

## 🎯 Best Practices

### Do's ✅
- Use semantic HTML (section, article, nav, etc.)
- Follow the component hierarchy
- Keep components under 40 lines
- Use shared components for consistency
- Add animations to interactive elements
- Test on mobile first

### Don'ts ❌
- Don't create giant monolithic components
- Don't skip responsive breakpoints
- Don't animate on every hover
- Don't use inline styles (use Tailwind)
- Don't ignore accessibility
- Don't duplicate code (create shared components)

---

## 📞 Support Resources

### Find Component Examples
- Look in `src/components/home/` for home sections
- Look in `src/components/about/` for about pages
- Look in `src/components/products/` for product pages
- Look in `src/components/layout/` for layout components

### Data Files
- All data is in `src/data/`
- Organized by section (home/, about/, products/, layout/)
- Import with: `import { DATA_NAME } from "@/data/..."`

### Styling Resources
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- shadcn/ui: https://ui.shadcn.com/

---

## 🚀 Deploy Checklist

Before deploying, verify:
- [ ] All components build without errors: `npm run build`
- [ ] No console warnings in dev tools
- [ ] Responsive design tested on mobile/tablet/desktop
- [ ] All animations work smoothly
- [ ] Forms submit and reset properly
- [ ] Images load correctly
- [ ] Links navigate correctly
- [ ] No hardcoded IPs or localhost URLs

---

**Happy coding! 🎉**

For detailed architecture info, see: `COMPONENT_ARCHITECTURE.md`  
For full refactoring details, see: `REFACTORING_SUMMARY.md`
