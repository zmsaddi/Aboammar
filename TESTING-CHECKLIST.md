# ABO AMMAR Website - Testing Checklist

## ✅ Features to Test

### 📱 Mobile Testing (< 768px)
- [ ] Tabs display vertically with icons
- [ ] Logo and brand name visible
- [ ] WhatsApp header button works
- [ ] Products grid shows 1 column
- [ ] Search box is full width
- [ ] Filter dropdown works
- [ ] Product cards display correctly
- [ ] WhatsApp button on each product works
- [ ] Floating WhatsApp button visible (bottom left)
- [ ] Scroll-to-top button appears after scrolling
- [ ] Tab switching works smoothly
- [ ] Arabic text displays correctly

### 💻 Tablet Testing (768px - 1024px)
- [ ] Tabs display horizontally with icons + text
- [ ] Products grid shows 2-3 columns
- [ ] Filters display in a row
- [ ] All spacing looks good

### 🖥️ Desktop Testing (> 1024px)
- [ ] Products grid shows 4 columns
- [ ] Full layout with proper spacing
- [ ] Hover effects work on cards
- [ ] All animations smooth

---

## 🔄 Tab Switching
- [ ] **المنتجات (Products)** tab active by default
- [ ] Click **عن الشركة (About)** - content changes
- [ ] Click **اتصل بنا (Contact)** - content changes
- [ ] Active tab has gold underline
- [ ] Page scrolls to top when switching tabs
- [ ] Smooth fade-in animation

---

## 🔍 Products Tab
- [ ] Shows "اكتشف عالم العطور الفاخرة" hero section
- [ ] PDF download button visible
- [ ] Search box works (type "دولتشي" or "DOLCE")
- [ ] Company filter works (select "ib" or "l.c")
- [ ] Product count updates correctly
- [ ] Products load (should show 24 initially)
- [ ] Scroll down - more products load (infinite scroll)
- [ ] Each product card shows:
  - Arabic name (gold color)
  - English name (gray color)
  - Code number
  - Company name
  - WhatsApp button

---

## 📄 PDF Download
- [ ] Click "تحميل الكتالوج PDF" button
- [ ] PDF downloads with today's date
- [ ] PDF header shows:
  - "عطور أبو عمار" (gold)
  - "ABO AMMAR Perfumes"
  - "WhatsApp: +20 103 263 7495"
  - "https://aboammar.vercel.app" ✨ NEW
- [ ] Table has columns: الكود, الشركة, English Name, الاسم بالعربي
- [ ] **Arabic text is DARK/BLACK (not gray)** ✨ NEW
- [ ] **English text is DARK/BLACK (readable)** ✨ NEW
- [ ] Footer shows page numbers
- [ ] All products included (filtered list)

---

## 📞 WhatsApp Integration
### Header Button
- [ ] Click WhatsApp button in header
- [ ] Opens WhatsApp with "مرحباً" message
- [ ] Works on mobile/desktop

### Product Card Button
- [ ] Click WhatsApp on any product
- [ ] Message includes:
  - "الاسم بالعربي: [Arabic name]"
  - "English Name: [English name]"
  - "الكود: [code]"
  - "الشركة: [COMPANY]"
  - "الموقع: https://aboammar.vercel.app" ✨ NEW

### Floating Button
- [ ] Floating button visible (bottom left)
- [ ] Opens WhatsApp with "مرحباً"
- [ ] Button pulses/grows on hover

---

## ℹ️ About Tab
- [ ] Shows large company logo
- [ ] "عطور أبو عمار" heading
- [ ] "وجهتك الأولى للعطور الفاخرة" tagline
- [ ] Company description in Arabic
- [ ] 3 feature cards:
  - منتجات أصلية (Authentic Products)
  - تنوع هائل (Huge Variety)
  - خدمة متميزة (Excellent Service)
- [ ] Cards have hover effect

---

## 📱 Contact Tab
- [ ] "تواصل معنا" heading
- [ ] WhatsApp contact card with phone number
- [ ] Click card - opens WhatsApp
- [ ] Info section shows:
  - **"الموقع الإلكتروني: https://aboammar.vercel.app"** ✨ NEW
  - "ساعات العمل: متاح على مدار الساعة - 24/7"
  - "الضمان: جميع المنتجات أصلية 100%"
- [ ] Website link is clickable

---

## 🔗 Footer
- [ ] Shows copyright "© 2024 عطور أبو عمار"
- [ ] Shows "WhatsApp: +20 103 263 7495"
- [ ] Shows **"| https://aboammar.vercel.app"** ✨ NEW
- [ ] Website link is clickable and gold-colored

---

## 🌐 Vercel Deployment
- [ ] Visit: https://aboammar.vercel.app
- [ ] Website loads correctly
- [ ] All features work on live site
- [ ] Mobile responsive on real devices
- [ ] No console errors (press F12)

---

## 🎨 Visual Quality
- [ ] Gold theme (#d4af37) consistent throughout
- [ ] Black/dark gray background
- [ ] White text readable
- [ ] No broken images
- [ ] Logo loads correctly (a.00.jpg)
- [ ] Arabic fonts (Cairo) load correctly
- [ ] No layout shifts
- [ ] Animations smooth (60fps)

---

## ✨ NEW Features to Verify
1. **Website URL everywhere:**
   - ✅ PDF header
   - ✅ Contact tab info section
   - ✅ Footer
   - ✅ WhatsApp messages

2. **Darker PDF fonts:**
   - ✅ Body text: Almost black `[20, 20, 20]`
   - ✅ Arabic text: Pure black `[0, 0, 0]`
   - ✅ Much better readability

3. **Tabbed interface:**
   - ✅ Clean 3-tab design
   - ✅ Mobile responsive tabs
   - ✅ Smooth animations

---

## 🐛 Known Issues to Check
- [ ] No console errors in browser DevTools
- [ ] products.js loads (299KB file)
- [ ] amiri-font.js loads (562KB file)
- [ ] All 2,144 products available
- [ ] No "undefined" or "null" values
- [ ] Arabic text not showing boxes/squares

---

## 📊 Performance
- [ ] Website loads in < 3 seconds
- [ ] Scrolling is smooth
- [ ] No lag when typing in search
- [ ] Tab switching instant
- [ ] Images load quickly

---

## ✅ Final Checks
- [ ] Test on Chrome/Edge
- [ ] Test on Firefox
- [ ] Test on Safari (if available)
- [ ] Test on real mobile device
- [ ] Test on real tablet
- [ ] Share link with someone to verify

---

## 🚀 Deployment Info
- **GitHub Repo:** https://github.com/zmsaddi/Aboammar
- **Live Site:** https://aboammar.vercel.app
- **Last Update:** 2025-10-22
- **Version:** Tabbed Interface v1.0

---

## 📝 Notes
- Infinite scroll loads 24 products at a time
- PDF generates based on current filtered products
- Website URL included in all communications
- Darker fonts for better PDF readability
- Mobile-first responsive design
