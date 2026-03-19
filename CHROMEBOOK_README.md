# Public Speaking Grader - Chromebook Plus Setup

## What You Have

Your Public Speaking Grader now has **two versions**:

### 1. **Desktop App** (.exe)
- **Location**: `dist\win-unpacked\Public Speaking Grader.exe`
- **Works on**: Windows only
- **No internet required**: Completely offline
- **Best for**: Teachers using Windows PCs/Laptops

### 2. **Web App** (PWA - Progressive Web App)
- **Location**: `web-build/` folder
- **Works on**: Chromebook Plus, tablets, any modern browser
- **Can work offline**: Service worker caches everything
- **Best for**: Chromebook users, mobile devices

---

## Quick Start for Chromebook Plus

### Step 1: Deploy to Cloud (Choose ONE)

#### **Easiest: GitHub Pages**
```bash
# Files are ready in: web-build/
# 1. Create GitHub account
# 2. Create repository: public-speaking-grader
# 3. Upload contents of web-build/ folder
# 4. Enable GitHub Pages in Settings
# 5. Visit: https://YOUR_USERNAME.github.io/public-speaking-grader
```

#### **Fast & Recommended: Vercel**
```bash
# 1. Go to vercel.com
# 2. Connect your GitHub repo
# 3. Deploy (auto-deploys on each push)
# 4. Visit your Vercel URL
```

#### **Alternative: Netlify**
```bash
# 1. Go to netlify.com
# 2. Drag & drop web-build/ folder
# 3. Done! You have a live URL
```

### Step 2: Install on Chromebook

1. **Open the URL** in Chrome browser
2. **Click the Install icon** (↓ arrow in address bar)
3. **Select "Install"**
4. **App appears on shelf & app drawer**

### Step 3: Start Grading!

- ✅ Works offline (cached by service worker)
- ✅ All data saves locally on device
- ✅ Access all three graders instantly
- ✅ Use print to export feedback

---

## Detailed Instructions

### For GitHub Pages Deployment

```bash
# 1. Create GitHub account at github.com/signup

# 2. Create repository called "public-speaking-grader"

# 3. Upload web-build files:
#    - Go to your repository
#    - Click "Add file" → "Upload files"
#    - Select ALL files from web-build/ folder:
#      - index.html
#      - manifest.json
#      - sw.js
#      - assets/ (entire folder)
#      - vite.svg
#    - Commit changes

# 4. Enable Pages:
#    - Settings → Pages
#    - Source: Deploy from branch
#    - Branch: main, folder: / (root)
#    - Save

# 5. Access: https://YOUR-USERNAME.github.io/public-speaking-grader
```

### For Self-Hosting (Your Own Server)

```bash
# 1. Build locally:
npm run build

# 2. Upload web-build/ folder to your web server

# 3. Configure server:
#    - Serve index.html for all routes (SPA routing)
#    - MIME type for sw.js: application/javascript
#    - Enable HTTPS (required for service workers!)

# 4. Or run locally with:
npm install express
npm run serve

# 5. Access: http://localhost:3000 (or HTTPS on your server)
```

---

## File Structure

```
web-build/
├── index.html          ← Main app page
├── manifest.json       ← PWA metadata (for install)
├── sw.js              ← Service worker (offline cache)
├── assets/
│   ├── index-*.js     ← React app code
│   └── index-*.css    ← Styling
└── vite.svg           ← Icon
```

---

## Features on Chromebook

| Feature | Desktop App | Web App |
|---------|------------|---------|
| Works on Chromebook | ❌ | ✅ |
| Works offline | ✅ | ✅ |
| Installable | ✅ | ✅ |
| No download needed | ❌ | ✅ |
| Data persistence | ✅ | ✅ |
| Print functionality | ✅ | ✅ |
| All 3 graders | ✅ | ✅ |

---

## Updating Your App

After making changes to the app code:

```bash
# 1. Rebuild
npm run build

# 2. Deploy new web-build/ to your hosting service

# 3. Service worker automatically updates on next access
```

---

## Troubleshooting

### "Can't install app"
- ✓ Using HTTPS? (not HTTP)
- ✓ Cleared browser cache?
- ✓ Using Chrome? (not Firefox/Edge)

### "Data not saving"
- ✓ Enable cookies in Chrome settings
- ✓ Not in Incognito mode?
- ✓ Storage not full?

### "Service worker not updating"
- ✓ Hard refresh: `Ctrl+Shift+R`
- ✓ Clear cache in Settings → Privacy

### "App won't load offline"
- ✓ Visit app once while online
- ✓ Service worker needs to cache first

---

## Free Hosting Options

| Provider | Cost | Setup Time | Best For |
|----------|------|-----------|----------|
| GitHub Pages | Free | 5 min | Simple, public projects |
| Vercel | Free | 2 min | Fast, auto-deploy |
| Netlify | Free | 2 min | Easy drag-and-drop |
| Firebase Hosting | Free tier | 10 min | Full backend option |

---

## Security & Privacy

- **Your data stays on Chromebook**: Nothing uploaded to cloud
- **No account needed**: Uses browser's localStorage
- **Open source**: All code visible in your browser (F12 → Sources)
- **No ads or tracking**: Pure app experience

---

## Support

- **GitHub Pages help**: https://pages.github.com
- **Vercel docs**: https://vercel.com/docs
- **Netlify guide**: https://docs.netlify.com
- **PWA resources**: https://web.dev/progressive-web-apps/

---

## Summary

```
You now have:
✅ Desktop app for Windows (.exe file)
✅ Web app for Chromebook (web-build/ folder)
✅ Ready to deploy!

Next step: Pick a deployment option above and get your app live!
```

**Happy grading! 🎉**
