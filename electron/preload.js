// Preload script - runs before renderer process
// You can expose Electron APIs here if needed

import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  // You can add Electron API methods here if needed
});
