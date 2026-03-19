# Simple Launcher Script
Just double-click **"Launch App.bat"** in the project folder to run your app!

Your Electron desktop app is ready at:
- **Location**: `dist/win-unpacked/Symposium Research Grading App.exe`
- **Launcher**: `Launch App.bat` (double-click to open)

## Building Updated Versions

Whenever you make changes to your app, rebuild with:
```bash
npm run electron-build
```

This will update the executable in the `dist/win-unpacked` folder.

## Creating a Standalone Installer (Optional)

If you want to create a proper installer (.exe or .msi) in the future:
1. Run the app as admin
2. Use: `npm run electron-build` with proper signing certificate
3. Or contact support for pre-built installers

Enjoy your desktop app!
