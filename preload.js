const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  logMessage: (message) => ipcRenderer.send("log-message", message),
  invokeGemini: (prompt) => ipcRenderer.invoke("gemini-api-call", prompt),
});
