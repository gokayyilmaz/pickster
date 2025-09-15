const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const { GoogleGenAI } = require("@google/genai");
const electronReload = require("electron-reload");

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("FATAL: GEMINI_API_KEY environment variable not set.");
  app.quit();
}
const ai = new GoogleGenAI(apiKey);

electronReload(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

async function handleGeminiCall(event, prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error: Could not get a response from the API.";
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.on("log-message", (event, message) => {
    console.log(message);
  });

  ipcMain.handle("gemini-api-call", handleGeminiCall);
});
