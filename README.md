# InStall Studio — Premium Automotive Detailing Website

🚗 **Elite car detailing studio website** built with modern web technologies for **InStall Studio** in Kyiv, Ukraine.

## 🎯 Features

✅ **Dark Editorial Minimalism** — Sophisticated dark theme with premium typography  
✅ **Interactive Before/After Slider** — Drag, click, or keyboard controls  
✅ **GSAP ScrollTrigger Animations** — 60 FPS smooth scroll experiences  
✅ **Fullscreen Lightbox Gallery** — Navigate projects with keyboard & mouse  
✅ **Dynamic Services Accordion** — Expandable service descriptions  
✅ **Lead Form with Validation** — Phone masking, real-time error checking  
✅ **100% Ukrainian (uk-UA)** — All text, UI, and copy in Ukrainian  
✅ **Responsive Design** — Optimized for desktop, tablet, and mobile  
✅ **API-Driven Content** — Projects, services, reviews load dynamically from backend  

## 📋 Project Structure

```
install-studio/
├── server/
│   ├── server.js              # Express server entry point
│   ├── routes/
│   │   ├── leads.js           # POST /api/leads (form submission)
│   │   └── data.js            # GET /api/data/* (projects, services, reviews)
│   └── data/
│       ├── projects.json      # Case studies & portfolio
│       ├── services.json      # 4 core services with descriptions
│       └── reviews.json       # Client testimonials
├── public/
│   ├── css/
│   │   ├── reset.css          # CSS variables, reset, typography
│   │   ├── main.css           # Layout, sections, responsive
│   │   └── components.css     # Lightbox, form, animations
│   ├── js/
│   │   ├── app.js             # Main app logic, form handling, data loading
│   │   ├── gsap-animations.js # ScrollTrigger scenes & parallax
│   │   ├── before-after.js    # Interactive slider with drag/touch
│   │   └── lightbox.js        # Fullscreen gallery engine
│   └── images/                # Optimized WebP assets (fallback Unsplash)
├── views/
│   └── index.html             # Semantic HTML structure
├── package.json               # Dependencies & scripts
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/daniilgrafov20-lang/install-studio.git
   cd install-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3000`

4. **Production build:**
   ```bash
   npm start
   ```

## 🎨 Design System

### Color Palette
- **Background:** `#080808` (rich off-black)
- **Text Primary:** `#FFFFFF` (crisp white)
- **Text Secondary:** `#888888` (muted gray)
- **Accent:** `#FFD700` (controlled warm yellow)

### Typography
- **Headings:** System font stack, 700 weight, tight letter-spacing
- **Body:** System font stack, 400 weight, 1.6 line-height
- **Accent text:** Letter-spacing +1px to +2px

### Animations
- **Easing:** `cubic-bezier(0.25, 1, 0.5, 1)` (custom editorial ease)
- **Duration:** 0.8s standard, 0.3s micro-interactions
- **GPU:** Transform & opacity only (60 FPS locked)

## 📱 Key Sections

### 1. Header & Progress Bar
- Fixed progress bar (2px) expands on scroll
- Sticky header with blur effect after scroll
- Navigation links to all major sections

### 2. Hero Section
- Fullscreen 100vh background image
- Large display typeface (8vw-10vw dynamic)
- Single CTA to portfolio
- Animated scroll indicator

### 3. Intro (Philosophy)
- Editorial layout with generous whitespace
- Emotional copy about brand values
- Split image/text grid

### 4. Before/After Slider
- **Interaction:** Drag handle, click anywhere, arrow keys
- **Touch:** Full support on mobile
- **Labels:** Dynamic "ДО" / "ПІСЛЯ" indicators
- **Parallax:** Subtle vertical movement on scroll

### 5. Projects Grid
- **Asymmetric layout:** Alternating full-width, 2-column, single cards
- **Hover effect:** Subtle scale (1.03) + overlay reveal
- **Gallery:** Click to open fullscreen lightbox

### 6. Lightbox Gallery
- **Navigation:** Arrow buttons, keyboard (← → ESC)
- **Counter:** Current / Total image display
- **Backdrop click:** Close gallery

### 7. Services Accordion
- 4 core services (Полірування, Захисна плівка, Кераміка, Хімчистка)
- **Expand behavior:** Click to open, one active at a time
- **Content:** 3-column layout (About / Target / Result)
- **Pricing note:** Dynamic pricing disclaimer

### 8. Reviews
- **5-star ratings** (visual ★★★★★)
- **Client testimonials** with car model
- **Grid layout** responsive to screen size

### 9. Contact & Lead Form
- **Inputs:** Name, Phone (+380 mask), Service (dropdown), Comment
- **Validation:** Real-time error display
- **Success/Error:** Toast-like feedback messages
- **Direct links:** Phone, address, Telegram, Instagram

## 🔌 API Endpoints

### POST /api/leads
Submit a lead/inquiry form.

**Request:**
```json
{
  "name": "Олександр",
  "phone": "+380937232323",
  "service": "Захисна плівка",
  "comment": "Porsche Taycan 2024"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Дякуємо! Вашу заявку прийнято. Ми зв'яжемося з вами найближчим часом."
}
```

### GET /api/data/projects
Fetch all portfolio projects.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Porsche 911 GT3 RS",
    "category": "Полірування",
    "description": "...",
    "image": "https://...",
    "gallery": ["https://...", "https://..."],
    "specs": "911 GT3 RS 2023 • Black Metallic • PPF + Ceramic"
  }
]
```

### GET /api/data/services
Fetch service descriptions.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Полірування",
    "icon": "✨",
    "about": "...",
    "target": "...",
    "result": "..."
  }
]
```

### GET /api/data/reviews
Fetch client testimonials.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Олександр",
    "car": "Porsche 911 Carrera",
    "rating": 5,
    "text": "Неймовірна робота! ...",
    "date": "2024-08-15"
  }
]
```

## 🎬 GSAP Animation Scenes

- **Hero Title:** Staggered line reveal (0.2s per line)
- **Intro Section:** Parallax slide-in on scroll
- **Before/After:** Vertical parallax scrub (yPercent ±5%)
- **Projects:** Staggered grid opacity/y reveal
- **Services:** Left-slide accordion items on scroll
- **Reviews:** Staggered card fade-in
- **Contact:** Split-reveal form + info block

## 📱 Responsive Breakpoints

- **Desktop:** 1440px+ (full featured)
- **Tablet:** 1024px (single-column grids)
- **Mobile:** 768px & 375px (optimized touch targets)

## 🌐 Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  

## 📝 Content Management

Dynamic content is stored in JSON files and loaded via API:

- **Edit projects:** `server/data/projects.json`
- **Edit services:** `server/data/services.json`
- **Edit reviews:** `server/data/reviews.json`
- **Restart server** after changes for live updates

## 🔐 Security Notes

- Form validation on both client & server
- Phone regex enforces +380 Ukraine format
- CORS enabled for local development
- XSS prevention via template literals (no innerHTML)

## 📦 Dependencies

- **express@4.18.2** — Web server
- **cors@2.8.5** — Cross-origin requests
- **gsap@3.12.2** — Animations (loaded from CDN)
- **ScrollTrigger** — GSAP plugin (loaded from CDN)

## 🚀 Deployment

### Vercel
```bash
vercel
```

### Heroku
```bash
heroku create install-studio
git push heroku main
```

### Custom VPS (Node.js)
```bash
node server/server.js
```
Use PM2 for production process management:
```bash
pm2 start server/server.js --name install-studio
```

## 📧 Contact & Business Info

- **Studio Name:** InStall Studio
- **Location:** м. Київ, вул. Березняківська 29-Б
- **Phone:** 093 723 23 23 (`tel:+380937232323`)
- **Telegram:** https://t.me/install_studio
- **Instagram:** https://www.instagram.com/install_studio_kyiv/

## 📄 License

MIT License — See LICENSE file for details

## 👨‍💻 Development

Built by Creative Developer & UX Designer as a premium brand experience.

---

**Made with ❤️ for InStall Studio**  
*Детейлінг, який видно.*
