# Design Guidelines: Lashing & Packing Company Website

## Design Approach
**Reference-Based Approach**: Industrial B2B corporate sites with modern aesthetics - drawing inspiration from logistics companies like Maersk, DHL Global, and modern industrial portfolios that balance professionalism with visual impact.

---

## Brand Identity & Visual Language

### Color System
- **Primary**: Teal `#1BAAA5` (from logo) - Use for CTAs, accents, hover states, section dividers
- **Secondary**: Dark Charcoal `#2D3748` - Headers, body text, footer background
- **Neutral**: Light Gray `#F7FAFC` for backgrounds, White for cards and content areas
- **Accent**: Lighter Teal `#7DD3CE` for subtle highlights and gradients

### Typography
- **Headings**: Clean sans-serif (Inter or Poppins) - Bold weights (600-700)
  - H1: 3.5rem desktop / 2.5rem mobile
  - H2: 2.5rem desktop / 2rem mobile  
  - H3: 1.75rem desktop / 1.5rem mobile
- **Body**: Same family, regular weight (400), 1rem base with 1.6 line-height
- **Emphasis**: Medium weight (500) for subheadings and labels

### Shape Language
**Curved & Wave Geometry** (inspired by logo):
- Subtle rounded corners: `rounded-lg` (8px) for cards and buttons
- Wave dividers between major sections using SVG curves
- Smooth, flowing animations and transitions
- Avoid sharp angles; prefer soft, professional curves

---

## Layout System

### Spacing Scale
Use Tailwind units: **4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Section padding: `py-20` desktop / `py-12` mobile
- Container max-width: `max-w-7xl` for content sections
- Grid gaps: `gap-8` desktop / `gap-6` mobile

### Grid Strategy
- **Services cards**: 3 columns desktop → 2 tablet → 1 mobile
- **Client logos**: 6 across desktop → 4 tablet → 3 mobile (auto-scroll)
- **Gallery**: Masonry-style grid with 3-4 columns, lightbox overlay
- **Why Choose Us**: 2-3 column feature grid with icons

---

## Page-Specific Design

### Home Page
**Hero Section** (Full viewport height):
- Large industrial/cargo background image (shipping containers, lashing operations, maritime scenes)
- Dark overlay (40-50% opacity) for text readability
- Centered content with company tagline
- Dual CTAs with blurred glass-morphism backgrounds: "Get Quote" (teal) + "Contact Us" (outline)
- Subtle wave divider at bottom transitioning to white

**Services Preview**: 
- 3-column grid with service cards
- Each card: Large image (16:9), service name, 2-line description, "Learn More" link
- Hover effect: Slight lift with shadow increase

**Client Logo Carousel**:
- Infinite auto-scroll on white/light gray background
- Grayscale logos with teal filter on hover
- 6 logos visible at once, seamless loop

**Why Choose Us Section**:
- 3-column grid with icon (minimal, line-style), bold heading, description
- Focus: Safety, Quality Materials, Professional Manpower

### About Us Page
**Hero**: Maritime-themed image with company name overlay
**Content Layout**: 
- Single column, max-width prose for readability
- Vision/Mission in 2-column cards with teal accent borders
- Professional team photo (optional) in full-width section

### Services Pages
**Main Services Page**: 
- 5 service cards in grid (3-2 layout on desktop)
- Large imagery showing actual lashing/packing work

**Service Detail Pages**:
- Hero: Full-width service-specific image
- Description section with left-aligned text, right-aligned supporting image
- Workflow: 4-step horizontal timeline with numbers, icons, descriptions
- Gallery slider: 5-7 images in carousel

### Gallery Page
- Filterable masonry grid (All/Automobile/Heavy Equipment/Packing/etc.)
- Lightbox with image navigation, captions
- Lazy loading for performance

### Contact Page
- 2-column layout: Form (left) + Map & Info (right)
- Form fields with teal focus states
- WhatsApp floating button: Teal circle, bottom-right, fixed position

---

## Component Library

### Buttons
- **Primary**: Teal background, white text, rounded-lg, shadow-md
- **Secondary**: White background, teal border, teal text
- **On Images**: Glass-morphism effect with backdrop-blur, semi-transparent white/teal

### Cards
- White background, shadow-sm, rounded-lg, hover:shadow-lg transition
- Image at top (if applicable), content padding p-6

### Navigation
- Sticky header with white background, subtle shadow on scroll
- Logo left, menu center/right, teal underline on active page
- Mobile: Hamburger menu with slide-in drawer

### Footer
- Dark charcoal background, white/gray text
- 4-column layout: About, Services, Quick Links, Contact
- Bottom bar with copyright and social icons
- WhatsApp icon included

### Forms
- Input fields: Border-gray-300, focus:border-teal, rounded-md
- Labels: Charcoal, medium weight, above inputs
- Submit button: Primary teal button style

---

## Images

### Required Images (Photographic)
1. **Hero - Home**: Industrial cargo scene (shipping containers, lashing straps visible, professional workers)
2. **Services Cards**: 5 images showing each service in action (actual lashing operations, packing processes)
3. **Service Detail Pages**: 2-3 images per service (close-ups of materials, safety equipment, finished work)
4. **About Page**: Team or facility photo (optional but recommended)
5. **Gallery**: 15-20 high-quality photos across all service categories
6. **Client Logos**: Uploaded via admin (grayscale treatment)

**Image Treatment**: All images should convey professionalism, safety, and industrial quality. Prefer real photography over stock when possible.

---

## Animations & Interactions
- **Minimal and purposeful**: Smooth scroll, fade-in on scroll for sections
- **Logo carousel**: Continuous auto-scroll at 30px/second
- **Card hover**: Transform scale(1.02) + shadow increase, 300ms ease
- **Form submission**: Loading spinner, success/error toast notifications
- **Avoid**: Excessive parallax, complex scroll-triggered animations

---

## SEO & Performance Optimization
- Alt text on all images (descriptive: "Workers securing automobile with teal lashing straps")
- Meta descriptions: 150-160 characters highlighting services and location
- Lazy load images below fold
- Optimize images: WebP format, responsive sizes
- Fast load target: <3 seconds on 3G

---

## Responsive Breakpoints
- Mobile: <768px (single column, stacked layout)
- Tablet: 768-1024px (2-column grids, adjusted spacing)
- Desktop: >1024px (full multi-column layouts)

**Mobile-First**: Design mobile experience first, enhance for larger screens.