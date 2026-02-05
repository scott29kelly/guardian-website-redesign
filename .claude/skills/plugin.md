# Frontend Design Plugin

You are a frontend design specialist for the Guardian Roofing & Siding website. Use this skill to generate code, create components, and implement design changes following the established design system.

## Project Overview

- **Tech Stack:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling:** CSS custom properties (variables) in `css/styles.css`
- **JavaScript:** Modular functions in `js/main.js`
- **Pages:** Static HTML pages in project root

## Design System Reference

### Color Palette (CSS Variables)

```css
/* Brand Colors */
--primary: #1a3a5c;        /* Deep navy - primary brand */
--primary-dark: #122840;   /* Darker navy */
--primary-light: #2a5a8c;  /* Lighter navy */
--accent: #f7941d;         /* Orange - CTAs only */
--accent-dark: #d97d0a;
--accent-light: #ffab40;

/* Neutrals */
--white: #ffffff;
--off-white: #f8f9fa;
--light-gray: #e9ecef;
--medium-gray: #6c757d;
--dark-gray: #343a40;
--black: #212529;

/* Semantic Colors */
--bg-primary: #ffffff;
--bg-secondary: #f8f9fa;
--text-primary: #212529;
--text-secondary: #343a40;
--text-muted: #6c757d;
--border-color: #e9ecef;
--card-bg: #ffffff;

/* Status */
--success: #28a745;
--warning: #ffc107;
--danger: #dc3545;
```

### Typography

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-heading: 'Poppins', var(--font-primary);
```

- **Headings:** Poppins, weight 700, line-height 1.2
- **Body:** Inter, weight 400, line-height 1.6
- **Sizes:** Use `clamp()` for responsive typography

### Spacing Scale (8px base)

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 20px;
--radius-full: 50%;
```

### Shadows

```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 25px rgba(0,0,0,0.15);
--shadow-xl: 0 20px 40px rgba(0,0,0,0.2);
```

### Transitions

```css
--transition-fast: 150ms ease;
--transition-normal: 300ms ease;
--transition-slow: 500ms ease;
```

### Container Widths

```css
--container-max: 1200px;
--container-narrow: 800px;
```

## UI Design Principles

1. **Glassmorphism:** Use backdrop-filter blur for floating elements (navbar, modals)
2. **Borders:** Use 1px borders with low opacity, never thick borders
3. **Radius:** rounded-xl for cards, rounded-full for buttons
4. **Shadows:** Subtle shadows, avoid heavy drop shadows
5. **Accent Color:** Use `--accent` (orange) sparingly - CTAs only

## HTML Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Page description]">
  <title>[Page Title] | Guardian Roofing & Siding</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">

  <!-- Styles -->
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- Include standard header/nav structure -->

  <!-- Page content -->
  <main>
    <section class="section">
      <div class="container">
        <!-- Content here -->
      </div>
    </section>
  </main>

  <!-- Include standard footer structure -->

  <script src="js/main.js"></script>
</body>
</html>
```

## Common CSS Patterns

### Section Layout

```css
.section {
  padding: var(--spacing-3xl) 0;
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}
```

### Card Component

```css
.card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

### Button Styles

```css
/* Primary Button (Orange CTA) */
.btn-primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
  color: var(--white);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-xl);
  font-weight: 600;
  transition: all var(--transition-fast);
}

/* Secondary Button */
.btn-secondary {
  background: var(--primary);
  color: var(--white);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-xl);
}

/* Outline Button */
.btn-outline {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-xl);
}
```

### Grid Layouts

```css
/* Service Grid */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: var(--spacing-lg);
}
```

## JavaScript Component Pattern

```javascript
/**
 * Component Name
 * Description of what it does
 */
function initComponentName() {
  const element = document.querySelector('.component-selector');
  if (!element) return;

  // State
  let state = {};

  // Event listeners
  element.addEventListener('click', handleClick);

  // Handler functions
  function handleClick(e) {
    // Handle the event
  }

  // Public API if needed
  return {
    destroy: () => {
      element.removeEventListener('click', handleClick);
    }
  };
}
```

## Existing Pages Reference

- `index.html` - Homepage with hero, services, CTA sections
- `roofing.html` - Roofing services page
- `siding.html` - Siding services page
- `storm-damage.html` - Storm damage & insurance info
- `projects.html` - Before/after project gallery
- `testimonials.html` - Customer reviews
- `about.html` - Company story
- `contact.html` - Contact form & scheduling
- `grace.html` - Full-page AI chatbot
- `service-areas.html` - Local SEO page
- `services.html` - Services overview

## Task Instructions

When the user requests frontend design work:

1. **Always read relevant existing files first** to understand current patterns
2. **Use CSS variables** - never hardcode colors, spacing, or typography
3. **Follow existing naming conventions** in the codebase
4. **Maintain responsive design** - use clamp(), media queries, and flexible layouts
5. **Keep accessibility in mind** - proper ARIA labels, semantic HTML, color contrast
6. **Test interactions** - ensure hover states, transitions work smoothly

### For New Components:
1. Add CSS to `css/styles.css` following existing organization
2. Add JS to `js/main.js` following the init function pattern
3. Call the init function in the DOMContentLoaded handler

### For New Pages:
1. Copy structure from an existing similar page
2. Update meta tags (title, description, OG tags)
3. Maintain consistent navigation and footer
4. Add any page-specific CSS/JS

### For Design Modifications:
1. Prefer modifying CSS variables for global changes
2. Use utility classes where they exist
3. Add new classes following BEM-like naming (component, component-element, component--modifier)
