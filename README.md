# Aquariz & Flanora Website Ecosystem (2026 Edition)

Welcome to the official digital presence repository for **Aquariz** (Parent Enterprise) and its flagship FMCG food brand **Flanora** (100% Pure Cold-Pressed Crushed Ginger & Garlic Pastes).

This is a **100% static HTML/CSS/JS** ecosystem — no build pipeline, no framework, no package manager. Every page is a single `.html` file with embedded styles and scripts.

---

## 🏛️ Brand Hierarchy & Architecture

```
aquariz/
├── index.html                  # Aquariz Corporate Parent Portal (Production)
├── 404.html                    # Root 404 page
├── flanora/
│   ├── index.html              # Flanora Sub-Brand Flagship (Production)
│   ├── 404.html                # Flanora 404 page
│   └── README.md               # ⚠️ outdated — do not trust for tech stack
├── archive/                    # Deprecated prototypes (NOT deployed)
├── assets/images/              # Shared image assets (4 JPGs)
├── robots.txt                  # Blocks /flanora/archive/ from indexing
└── AGENTS.md                   # Agent instructions for this repository
```

---

## 🏢 Corporate Profile: Aquariz

- **Entity Type:** Partnership Firm
- **Founders:** 6 BTech engineering graduates working across global technology hubs, investing back into Kerala's real manufacturing economy.
- **Headquarters & Facility:**
  - **Address:** Aquariz, Ward -12, Plot no 801/2-24, Thumboor, Thumboor P.O, Thrissur, Kerala, PIN: **680662**
  - **Google Maps Location:** [https://goo.gl/maps/rbidKvoeXM8ETowB9](https://goo.gl/maps/rbidKvoeXM8ETowB9)
- **GSTIN:** `32ACCFA6985C1ZL`
- **Contact:**
  - **Phone / WhatsApp:** `+91 6238 796 383`
  - **Email:** `aquariz.official@gmail.com`
  - **Instagram:** `@aquariz.in` & `@flanora.in`

---

## 🌿 Flagship Brand: Flanora

Flanora is a premium food brand manufacturing 100% pure cold-pressed crushed ginger and garlic pastes sourced directly from Kerala cultivators.

### Core Product Offerings:
1. **Crushed Ginger-Garlic Paste (50:50 Golden Blend)**
2. **Pure Crushed Garlic Paste (100% Whole Peeled Cloves)**
3. **Single-Origin Crushed Ginger Paste (Wayanad / High-Range Ginger)**

### Available Packaging Tiers:
- **Retail Pouches:** 200g & 500g
- **Commercial Foodservice & Catering Buckets:** 1kg & 5kg

---

## ⚡ Key Engineering & Performance Features

- **Mobile-First Kerala Optimization:** Designed specifically for fast loading on 3G/4G/5G Indian mobile networks and budget-to-flagship Android/iOS devices.
- **Progressive Enhancement:** Ambient CSS visual effects on desktop, zero-lag GPU gradients on mobile.
- **Dual Conversion Engine:**
  - One-tap dynamic WhatsApp ordering with auto-prefilled product and pack size selection.
  - Interactive B2B & Dealership Request for Quote (RFQ) generators.
  - 1-Click copy-to-clipboard for verified GSTIN (`32ACCFA6985C1ZL`).
  - Mobile bottom-anchored sticky action bar for direct WhatsApp and calling.

---

## 🚀 Deployment

No build step needed. Upload the directory contents to any static host. Ensure `index.html` and `flanora/index.html` are at the correct paths for your hosting provider (e.g., Netlify requires `flanora/index.html` to be at `flanora/`).

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Traditional Apache / Nginx / cPanel Hosting**

---

## 📁 For Agents

See [AGENTS.md](AGENTS.md) for repository-specific guidance, file structure, branding constants, and editing rules.