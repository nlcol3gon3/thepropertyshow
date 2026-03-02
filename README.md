# The Property Show Kenya — Website

A luxury, dark real estate website for First Avenue Properties Ltd / The Property Show Kenya.

## Project Structure

```
property-show-website/
├── index.html              ← Homepage
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← All JavaScript
├── images/                 ← Add real photos here
└── pages/
    ├── services.html       ← Services page
    ├── diaspora.html       ← Diaspora Desk page
    ├── upscale-homes.html  ← Upscale Homes page
    ├── ifundi.html         ← iFundi Home Services page
    ├── media.html          ← TV Shows & Media page
    ├── about.html          ← About page
    └── contact.html        ← Contact page with form
```

## Design

- **Colors**: Black #0a0a0a + Brand Red #ec2226 + Gold #c9a96e
- **Fonts**: Playfair Display (headings) + DM Sans (body) — loaded from Google Fonts
- **Aesthetic**: Dark luxury real estate — editorial, cinematic, professional

## Features

- Fixed navbar with scroll glass effect
- Mobile hamburger menu
- Hero section with animated ticker
- Scroll reveal animations on all sections
- Counter animations for stats
- 3D hover effects on service cards
- Working contact form (simulated)
- Responsive across all screen sizes
- CSS animations: ticker, marquee, fade-in, pulse

## Adding Real Photos

Replace SVG placeholders with actual images:

```html
<!-- Replace SVG blocks with: -->
<img src="../images/your-photo.jpg" alt="Description" style="width:100%;height:100%;object-fit:cover;">
```

Recommended photo sizes:
- Hero card: 400x500px
- Trust section: 500x625px
- Show cards: 600x500px

## Customization

All CSS variables are in `:root` in `style.css`:
- `--red: #ec2226` — Brand red (matches brand guidelines)
- `--gold: #c9a96e` — Accent gold
- `--black` / `--dark` / `--dark-2` / `--dark-3` — Dark palette

## Next Steps (Day 2)

- [ ] Add real photography from the brand/team
- [ ] Add Google Maps embed to Contact page
- [ ] Connect contact form to backend / WhatsApp / Formspree
- [ ] Add real property listings section
- [ ] Add WhatsApp floating button
- [ ] Add cookie consent if needed
- [ ] SEO meta tags for all inner pages
- [ ] Deploy to hosting (Netlify, Vercel, or cPanel)
