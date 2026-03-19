# Chromebook Plus Deployment Guide

Your Public Speaking Grader is now ready to run on Chromebook Plus! This guide shows you how to deploy it.

## Quick Start - Easy Options

### Option 1: GitHub Pages (FREE, Easiest)

1. **Create a GitHub account** (if you don't have one): https://github.com/signup

2. **Create a new repository**:
   - Go to https://github.com/new
   - Repository name: `public-speaking-grader`
   - Select "Public"
   - Click "Create repository"

3. **Upload the web build files**:
   - Click "Add file" → "Upload files"
   - Navigate to the `web-build` folder in your project
   - Select ALL files (index.html, manifest.json, sw.js, assets/, etc.)
   - Click "Commit changes"

4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Under "Build and deployment", select:
     - Source: "Deploy from a branch"
     - Branch: "main"
     - Folder: "/ (root)"
   - Click "Save"

5. **Access on Chromebook**:
   - Visit: `https://YOUR_USERNAME.github.io/public-speaking-grader`
   - Click the install button (⬇️) in the address bar
   - Select "Install"

---

### Option 2: Vercel (FREE, Fast, Recommended)

1. **Go to Vercel**: https://vercel.com

2. **Sign up** with GitHub (simplest option)

3. **Deploy**:
   - Click "New Project"
   - Import the GitHub repository you created
   - Click "Deploy"
   - Your app will be live at: `https://YOUR_PROJECT_NAME.vercel.app`

4. **Access on Chromebook**:
   - Visit the Vercel URL
   - Click the install button (⬇️) in the address bar
   - Select "Install"

---

### Option 3: Netlify (FREE)

1. **Go to Netlify**: https://netlify.com

2. **Sign up** with GitHub

3. **Deploy**:
   - Drag and drop the `web-build` folder here
   - Or connect GitHub repo and deploy

4. **Access on Chromebook**:
   - Visit the Netlify URL
   - Click the install button (⬇️) in the address bar
   - Select "Install"

---

### Option 4: Self-Host on Your Own Server

If you have your own web hosting:

1. **Upload the `web-build` folder** to your web server
2. **Configure** your server to:
   - Serve `index.html` for all routes (for SPA routing)
   - Set correct MIME type for `sw.js` (application/javascript)
   - Enable HTTPS (required for service workers)

3. **Important**: Your server MUST use HTTPS. Most hosting providers (AWS, Azure, Digital Ocean) offer free SSL certificates.

---

## Using on Chromebook Plus

### Installation Steps:

1. **Open the app URL** in Chrome on your Chromebook
2. **Click the install icon** (↓) in the address bar (top right)
3. **Select "Install"** 
4. The app will appear on your **Shelf** and **App Drawer**
5. **Works offline** - Service worker caches everything for offline access

### Keyboard Shortcuts:
- **Ctrl+Shift+T**: Restore closed apps
- **Alt+Tab**: Switch between apps
- **Drag from shelf**: Pin app for quick access

---

## Features Available on Chromebook

✅ **All three graders**: Symposium Research, Informative Speech, Persuasive Speech  
✅ **Offline functionality**: Service worker caches everything  
✅ **Data persistence**: LocalStorage saves all grades and notes  
✅ **Copy & Print**: Export summaries and print grading feedback  
✅ **Responsive design**: Works great on tablet or laptop mode  
✅ **Installable**: Can be installed as a standalone app  

---

## Troubleshooting

### App won't install?
- Make sure you're using **HTTPS** (not HTTP)
- Clear browser cache and try again
- Use Chrome (not other browsers)

### Data not saving?
- Check if cookies/storage are enabled in Chrome settings
- Try in incognito mode to test

### Service worker not updating?
- Hard refresh: **Ctrl+Shift+R**
- Clear cache: Settings → More tools → Clear browsing data

---

## Updating Your App

When you make changes to the app on your computer:

1. **Rebuild locally**: `npm run build`
2. **Upload new files** to your hosting service
3. **Service worker will auto-update** on next app load

---

## Support

For issues or questions about deploying, visit:
- GitHub Pages: https://pages.github.com
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

Enjoy grading on your Chromebook Plus! 🎉
