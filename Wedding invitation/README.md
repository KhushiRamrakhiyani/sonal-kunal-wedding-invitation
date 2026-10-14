# Kunal Weds Sonal — Luxury Illustrated Wedding Invitation Website
**Wedding Date:** Friday, 13 November 2026  
**Celebrations:** 10 November 2026 – 13 November 2026 (Ahmedabad)

---

## 🌸 Overview

A production-quality, mobile-first interactive digital wedding invitation website crafted for **Kunal Lalwani and Sonal Saheta**. Inspired by luxury contemporary Indian wedding stationery, hand-painted watercolor illustrations, botanical borders, and cinematic storytelling.

### Key Features
1. **10 Complete Storybook Chapters / Pages:**
   - **Page 1:** The Welcome Screen (Lord Ganesh Ji, Royal SK Gold Monogram, Opening Curtain)
   - **Page 2:** The Wedding Invitation (Grandparents' Blessings, Couple Introduction)
   - **Page 3:** Divine Blessings & Joyful Beginnings (ੴ ਸਤਿਨਾਮ ਵਾਹਿਗੁਰੂ, Guru Ghar Aaye & Mehendi)
   - **Page 4:** Sacred Traditions & Blessings (Ek Tu Hi Nirankar, Janeu Ceremony of Kunal & Yuvraj)
   - **Page 5:** An Evening of Divine Blessings (Jai Jhulelal, Behrana Sahib)
   - **Page 6:** Carnival (Colours of Joy, A Splash of Fun, Shayona Farm)
   - **Page 7:** Engagement & Sangeet Night (Dance floor, Champagne toast, Glamorous celebration)
   - **Page 8:** The Wedding Ceremony (A Beautiful Wedlock, Royal Floral Mandap, Varmala)
   - **Page 9:** The Reception (White-aesthetic fairy lights, First dance)
   - **Page 10:** A Special Invitation With Love (From Yuvraj & Shivangi, Family Blessings)
2. **Dual Experience Modes:**
   - **Storybook Mode (Card View):** 9:16 vertical cards with smooth slide transitions, swipe gestures, and Next/Previous navigation (ideal for mobile and video adaptation).
   - **Continuous Scroll Mode:** Fluid luxury scroll with progress bar and sticky header.
3. **Interactive Falling Petals Canvas:** Gentle drifting rose, marigold, and golden sparkle petals with toggle control.
4. **Ambient Wedding Audio Engine:** Web Audio API synthesized Indian Shehnai, Sitar & Tanpura Raag (no external audio files required to enjoy sound immediately!) + local MP3 support.
5. **Interactive Itinerary & Navigation Drawer:** Jump directly to any of the 10 celebrations.
6. **Venue Direction Integration:** Verified Google Maps links for Our Residence (`B-301, Shikhar Shine, Nana Chiloda, Ahmedabad – 382330`) and `Shayona Farm`.
7. **Calendar Integration:** One-click `.ics` calendar file download and Google Calendar event links.
8. **WhatsApp & Native Social Sharing:** Pre-formatted wedding invitation message with direct WhatsApp sharing and link copying.

---

## 📁 Project Architecture

```
Wedding invitation/
├── index.html                   # Primary wedding invitation application
├── assets/
│   ├── logo/
│   │   └── sk-monogram.svg      # Royal gold vector monogram with integrated heart
│   ├── illustrations/
│   │   ├── ganesh-blessing.svg
│   │   ├── wedding-invitation-couple.svg
│   │   ├── guru-ghar-mehendi.svg
│   │   ├── sacred-thread-ceremony.svg
│   │   ├── behrana-sahib.svg
│   │   ├── carnival-celebration.svg
│   │   ├── engagement-sangeet.svg
│   │   ├── wedding-mandap-couple.svg
│   │   ├── reception-evening.svg
│   │   ├── family-gratitude.svg
│   │   ├── floral-arch.svg
│   │   ├── floral-corner.svg
│   │   └── ornamental-divider.svg
│   ├── backgrounds/
│   │   └── bg-ivory-texture.svg # Organic watercolor paper texture
│   └── audio/
│       └── wedding-ambient.mp3  # Optional custom audio file location
├── css/
│   ├── variables.css            # Color tokens, fonts, spacing, shadows
│   ├── typography.css           # Luxury Cinzel, Garamond & Gurmukhi fonts
│   ├── layout.css               # Mobile-first 390x844 responsive grid
│   ├── components.css           # Buttons, drawer, music widget, toasts
│   ├── sections.css             # Unique themed styling for all 10 pages
│   └── animations.css           # Gold shimmer, breathing floats, reduced motion
└── js/
    ├── petals-canvas.js         # Canvas flower petal drift particle engine
    ├── music-player.js          # Web Audio Raga synthesizer + MP3 player
    ├── calendar.js              # iCalendar (.ics) and Google Calendar
    ├── share.js                 # Web Share API & WhatsApp integration
    ├── navigation.js            # Chapter management & mode switcher
    └── main.js                  # App bootstrap and interactions
```

---

## 🚀 How to Run Locally

Because the project is built with standard modern ES6, SVG, and CSS3, it requires zero build steps or package installations.

### Option 1: Python (Recommended)
From this project directory:
```powershell
python -m http.server 8080
```
Open your browser and navigate to:
```
http://localhost:8080
```

### Option 2: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 🌐 How to Deploy (Free Public Link)

### 1. GitHub Pages
1. Push this directory to a GitHub repository (e.g. `kunal-sonal-wedding`).
2. Go to **Repository Settings** > **Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch**, choose `main` / `root`.
4. Your website is instantly live at `https://<username>.github.io/<repo-name>/`.

### 2. Netlify / Vercel
- Simply drag-and-drop this folder onto [Netlify Drop](https://app.netlify.com/drop), and it provides a free SSL-secured custom link immediately.

---

## 📋 Asset Customization Checklist

- **Custom SK Logo:** If you have an exact PNG/JPG logo file, save it as `assets/logo/sk-monogram.png`. The website automatically detects and displays your custom logo!
- **Custom Music Track:** To play a specific song (e.g., an acoustic shehnai instrumental or wedding song), place the audio file at `assets/audio/wedding-ambient.mp3`.
