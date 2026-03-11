# EbookMind Brand Identity System

## 1. Logo & Brand Mark

### Primary Logo
```
[�] EbookMind
(Purple gradient square background)
```

### Logo Specifications
- **Icon**: � (Open book emoji) trên background gradient purple (#667eea → #764ba2)
- **Background**: Rounded square (border-radius: 12px), size 48px × 48px
- **Wordmark**: "EbookMind" (Inter Extrabold, gradient text)
- **Font**: Inter Extrabold / SF Pro Display Bold
- **Size**: 
  - Desktop: 32px height (logo) + 28px text
  - Mobile: 28px height (logo) + 24px text
- **Spacing**: 12px gap between icon and text
- **Color**: Icon white on gradient purple background, text gradient purple

### Logo Variations
1. **Full Logo**: Icon + Wordmark (primary)
2. **Icon Only**: Chỉ 📚 (cho favicon, app icon)
3. **Wordmark Only**: Chỉ "EbookMind" (cho footer)

## 2. Color Palette

### Primary Colors
```css
/* Purple Gradient - Brand Signature */
--gradient-purple: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-purple-hover: linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%);

/* Solid Purple */
--purple-600: #7c3aed;
--purple-700: #6d28d9;
--purple-500: #8b5cf6;
--purple-400: #a78bfa;
```

### Secondary Colors
```css
/* Indigo-Violet-Fuchsia Gradient */
--gradient-aurora: linear-gradient(to right, #6366f1, #8b5cf6, #d946ef);

/* Teal/Cyan (for accents) */
--teal-400: #2dd4bf;
--cyan-400: #22d3ee;
```

### Neutral Colors
```css
/* Gray Scale */
--gray-900: #111827;
--gray-800: #1f2937;
--gray-700: #374151;
--gray-600: #4b5563;
--gray-500: #6b7280;
--gray-400: #9ca3af;
--gray-300: #d1d5db;
--gray-200: #e5e7eb;
--gray-100: #f3f4f6;
--gray-50: #f9fafb;
```

### Semantic Colors
```css
/* Success */
--success: #10b981;
--success-bg: #d1fae5;

/* Warning */
--warning: #f59e0b;
--warning-bg: #fef3c7;

/* Error */
--error: #ef4444;
--error-bg: #fee2e2;

/* Info */
--info: #3b82f6;
--info-bg: #dbeafe;
```

## 3. Typography

### Font Families
```css
/* Primary Font - Sans Serif */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace - For codes */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

### Font Sizes
```css
/* Headings */
--text-4xl: 2.25rem;  /* 36px - Hero titles */
--text-3xl: 1.875rem; /* 30px - Page titles */
--text-2xl: 1.5rem;   /* 24px - Section titles */
--text-xl: 1.25rem;   /* 20px - Card titles */
--text-lg: 1.125rem;  /* 18px - Subheadings */

/* Body */
--text-base: 1rem;    /* 16px - Body text */
--text-sm: 0.875rem;  /* 14px - Small text */
--text-xs: 0.75rem;   /* 12px - Captions */
```

### Font Weights
```css
--font-black: 900;
--font-extrabold: 800;
--font-bold: 700;
--font-semibold: 600;
--font-medium: 500;
--font-normal: 400;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

## 4. Spacing System

### Base Unit: 4px
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

## 5. Border Radius

```css
--radius-sm: 0.375rem;  /* 6px - Small elements */
--radius-md: 0.5rem;    /* 8px - Buttons, inputs */
--radius-lg: 0.75rem;   /* 12px - Cards */
--radius-xl: 1rem;      /* 16px - Large cards */
--radius-2xl: 1.5rem;   /* 24px - Hero sections */
--radius-full: 9999px;  /* Pills, avatars */
```

## 6. Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

## 7. Components Style Guide

### Buttons

#### Primary Button
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
transition: all 0.2s;

hover:
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

#### Secondary Button
```css
background: white;
color: #7c3aed;
border: 2px solid #7c3aed;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;

hover:
  background: #f3f4f6;
```

### Cards
```css
background: white;
border-radius: 16px;
padding: 24px;
border: 1px solid #e5e7eb;
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

hover:
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  transform: translateY(-2px);
  transition: all 0.3s;
```

### Inputs
```css
background: white;
border: 1px solid #d1d5db;
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;
color: #111827;

focus:
  border-color: #7c3aed;
  ring: 2px solid rgba(124, 58, 237, 0.2);
  outline: none;
```

## 8. Icons

### Icon Library
- **Primary**: Lucide React
- **Fallback**: Heroicons

### Icon Sizes
```css
--icon-xs: 16px;
--icon-sm: 20px;
--icon-md: 24px;
--icon-lg: 32px;
--icon-xl: 48px;
```

### Common Icons
- 📚 Books (Logo)
- 🔍 Search
- 🛒 Cart
- ⭐ Star (Rating)
- 📥 Download
- ✓ Check (Success)
- ⚠ Warning
- ℹ Info
- ✕ Close

## 9. Gradient Text Effect

```css
.gradient-text-purple {
  background: linear-gradient(to right, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-aurora {
  background: linear-gradient(to right, #6366f1, #8b5cf6, #d946ef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## 10. Animation & Transitions

### Standard Transitions
```css
--transition-fast: 150ms ease-in-out;
--transition-base: 200ms ease-in-out;
--transition-slow: 300ms ease-in-out;
```

### Hover Effects
```css
/* Lift on hover */
hover:transform: translateY(-2px);
hover:box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
transition: all 0.2s ease-in-out;

/* Scale on hover */
hover:transform: scale(1.02);
transition: transform 0.2s ease-in-out;
```

## 11. Layout Grid

### Container Widths
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### Common Layouts
- **Max Width**: 1280px (xl)
- **Padding**: 16px mobile, 24px tablet, 32px desktop
- **Gap**: 24px (cards grid)

## 12. Responsive Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

## 13. Usage Examples

### Page Header
```tsx
<header className="bg-white border-b border-gray-200 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center text-white font-bold">
          📚
        </div>
        <span className="text-xl font-bold gradient-text-purple">EbookMind</span>
      </Link>
    </div>
  </div>
</header>
```

### Hero Section
```tsx
<section className="hero-gradient py-20">
  <div className="max-w-4xl mx-auto text-center px-4">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
      <span className="gradient-text-purple">EbookMind</span>
    </h1>
    <p className="text-lg text-gray-600 mb-8">
      Nền tảng ebook chất lượng cao
    </p>
    <button className="gradient-purple text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition">
      Khám phá ngay
    </button>
  </div>
</section>
```

## 14. Accessibility

### Color Contrast
- Text on white: Minimum AA (4.5:1)
- Large text: Minimum AA (3:1)
- Purple gradient on white: AAA compliant

### Focus States
```css
focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
outline: none
```

### Alt Text
- All images must have descriptive alt text
- Icons must have aria-label

## 15. Brand Voice

### Tone
- **Friendly**: Gần gũi, dễ hiểu
- **Professional**: Chuyên nghiệp, đáng tin cậy
- **Inspiring**: Truyền cảm hứng học tập

### Writing Style
- Ngắn gọn, súc tích
- Tránh thuật ngữ phức tạp
- Sử dụng emoji phù hợp (📚, ⭐, 💡)
