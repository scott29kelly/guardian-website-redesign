# Guardian Roofing & Siding - Website Redesign

A modern, mobile-first static website for Guardian Roofing & Siding, a family-owned roofing and siding company serving PA, NJ, DE, MD, VA, and NY.

## 🏠 Overview

This redesign focuses on:
- **Conversion optimization** - Clear CTAs, prominent phone number, easy scheduling
- **Trust building** - Certifications, testimonials, before/after galleries
- **Insurance claims education** - Step-by-step process explanation
- **Local SEO** - Service area pages with location-specific content
- **Mobile-first** - Responsive design with sticky mobile CTA

## 📁 Project Structure

```
guardian-redesign/
├── css/
│   └── styles.css          # Main stylesheet with CSS variables
├── js/
│   └── main.js             # Interactive features & animations
├── images/                  # Image placeholder directory
├── index.html              # Homepage
├── roofing.html            # Roofing services
├── siding.html             # Siding services
├── storm-damage.html       # Storm damage & insurance claims
├── projects.html           # Project gallery with filters
├── testimonials.html       # Customer reviews
├── about.html              # Company story & values
├── contact.html            # Contact form & scheduling
├── service-areas.html      # Service area listing (local SEO)
└── README.md               # This file
```

## 🎨 Branding

### Colors
- **Primary Navy:** `#1a3a5c`
- **Primary Dark:** `#122840`
- **Accent Orange:** `#f7941d`
- **Accent Dark:** `#d97d0a`

### Fonts
- **Headings:** Poppins (Google Fonts)
- **Body:** Inter (Google Fonts)

### Values
- Professional & trustworthy
- Family-owned, Christian values
- No high-pressure sales

## 🚀 Deployment

### Option 1: Static Hosting (Recommended)

This site is pure HTML/CSS/JS with no build step. Deploy to any static host:

**Netlify:**
```bash
# Drag and drop the folder to netlify.com/drop
# Or connect your Git repo
```

**GitHub Pages:**
```bash
# Push to a repo, enable GitHub Pages in settings
```

**Vercel:**
```bash
npm i -g vercel
vercel
```

**cPanel/FTP:**
1. Upload all files to `public_html` or your web root
2. Done!

### Option 2: Local Development

Simply open `index.html` in a browser. For a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📝 Customization Checklist

### Before Launch

1. **Images**
   - [ ] Add real photos to `/images/` directory
   - [ ] Hero images (1920x1080 recommended)
   - [ ] Project photos (800x600 minimum)
   - [ ] Team headshots (400x400)
   - [ ] Update `alt` text with descriptive content

2. **Content**
   - [ ] Review all copy for accuracy
   - [ ] Update testimonial names/locations if needed
   - [ ] Add real team member names & photos
   - [ ] Verify service area listings

3. **Contact Form**
   - [ ] Connect form to backend (Formspree, Netlify Forms, etc.)
   - [ ] Or integrate with CRM (HubSpot, Salesforce, etc.)
   - [ ] Test form validation

4. **Online Scheduling**
   - [ ] Set up Calendly (or similar) account
   - [ ] Embed Calendly widget in `contact.html`
   - [ ] Configure appointment types and availability

5. **Google Maps**
   - [ ] Add embedded Google Map to contact page
   - [ ] Or use Google Maps Static API for performance

6. **Analytics & Tracking**
   - [ ] Add Google Analytics 4
   - [ ] Set up Google Tag Manager
   - [ ] Configure conversion tracking for form submissions
   - [ ] Add Facebook Pixel if running ads

7. **SEO**
   - [ ] Add `sitemap.xml`
   - [ ] Add `robots.txt`
   - [ ] Set up Google Search Console
   - [ ] Verify all meta descriptions are unique

### Integrations to Consider

- **Form Handling:** Formspree, Netlify Forms, Basin, Web3Forms
- **Scheduling:** Calendly, Acuity, Square Appointments
- **Live Chat:** Tidio, Drift, Intercom, Crisp
- **Reviews:** Birdeye, Podium (for collecting reviews)
- **CRM:** HubSpot, Salesforce, Pipedrive

## ⚡ Performance Tips

1. **Images**
   - Compress all images (TinyPNG, ImageOptim)
   - Use WebP format with JPEG fallback
   - Implement lazy loading for below-fold images

2. **Fonts**
   - Google Fonts are already preconnected
   - Consider self-hosting for performance

3. **Caching**
   - Set appropriate cache headers on your server
   - Use a CDN (Cloudflare free tier works great)

## 🔧 CSS Variables

All colors, spacing, and typography are controlled via CSS variables in `styles.css`. To adjust branding:

```css
:root {
  --primary: #1a3a5c;        /* Main brand color */
  --accent: #f7941d;         /* CTA/highlight color */
  --font-primary: 'Inter';   /* Body font */
  --font-heading: 'Poppins'; /* Heading font */
}
```

## 📱 Features

- ✅ Responsive design (mobile-first)
- ✅ Sticky header with scroll effects
- ✅ Mobile sticky "Call Now" button
- ✅ Smooth scroll animations
- ✅ FAQ accordion
- ✅ Project gallery with filtering
- ✅ Lightbox for gallery images
- ✅ Form validation
- ✅ Counter animations
- ✅ Scroll reveal animations

## 🛠️ Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari
- Chrome for Android

## 📞 Contact Info

**Guardian Roofing & Siding**
- Phone: 855-424-5911
- Address: 610 Lakeside Dr, Southampton, PA 18966
- Email: info@guardianstormrepair.com
- Website: guardianstormrepair.com

## 📄 License

This website design was created for Guardian Roofing & Siding. All rights reserved.

---

Built with ❤️ for Guardian Roofing & Siding
