import { app, protocol } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("ready", async () => {
  // Custom file protocol to stream from local files
  protocol.registerFileProtocol("local-file-protocol", (request, callback) => {
    const url = request.url.replace("local-file-protocol://getFile/", "");
    try {
      return callback(url);
    } catch (error) {
      console.error(error);
      return callback({ error: 404 });
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
