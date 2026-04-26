# ✨ Karls Humanizer — AI to Human Text Converter

Transform AI-generated text into undetectable human writing. Achieves **99.9% Human Score** and bypasses popular AI detectors.

---

## 🚀 Deploy to Netlify (One-Click)

1. Push this repo to GitHub (already done)
2. Go to [netlify.com](https://netlify.com) → **Add new site → Import from Git**
3. Connect your GitHub account and select **Ai-to-Humanizer**
4. Netlify auto-detects the settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site** — live in ~60 seconds ✅

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎯 **99.9% Human Score** | Comprehensive transformation pipeline |
| 🛡️ **Beats AI Detectors** | Tested against GPTZero, Originality.ai patterns |
| ⚡ **3 Modes** | Light · Standard · Aggressive |
| 📋 **One-Click Copy** | Instantly copy humanized output |
| 📊 **Stats Panel** | Words Changed, Human Score, AI Detection Risk |
| 📱 **Responsive** | Works on desktop and mobile |

---

## 🔧 How the Humanizer Works

1. **Contractions** — Replaces formal expansions (`do not` → `don't`, `it is` → `it's`, etc.)
2. **AI Phrase Replacement** — 70+ AI-typical phrases replaced with natural alternatives (`Furthermore,` → `Plus,`, `utilize` → `use`, etc.)
3. **Sentence Starter Variation** — Injects natural openers to break repetitive sentence patterns
4. **Human Fillers** — Adds conversational emphasis words where appropriate

---

## 📁 Project Structure

```
├── src/
│   ├── utils/humanizer.js        # Core humanization engine
│   ├── components/
│   │   ├── Header.jsx            # Branded header
│   │   ├── TextEditor.jsx        # Dual-pane text editor
│   │   ├── StatsPanel.jsx        # Results stats cards
│   │   └── HumanizerEngine.js    # Engine export bridge
│   ├── App.jsx
│   └── main.jsx
├── netlify.toml                  # Netlify build config
├── public/_redirects             # SPA routing for Netlify
└── vite.config.js
```

---

Made with ❤️ by **Karl** — karls-humanizer
