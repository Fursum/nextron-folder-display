import { BrowserWindow, dialog } from "electron";
import { readdirSync, readFileSync } from "fs";

export enum FileSignals {
  SELECT_FOLDER = "file/selectFolder",
  READ_FOLDER = "file/readFolder",
  GET_FILE = "file/get",
  WRITE_FILE = "file/write",
}

export async function selectFolder(win: BrowserWindow) {
  const { canceled, filePaths } = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"],
  });
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}

export function getFolderContents(path: string) {
  return readdirSync(path, { withFileTypes: true, encoding: "utf-8" }).map(
    (file) => file.name
  );
}
