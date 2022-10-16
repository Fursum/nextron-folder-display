import { ipcRenderer } from "electron";
import { FileSignals } from "../../main/IPCFunctions";

export async function selectFolder(): Promise<string> {
  return await ipcRenderer.invoke(FileSignals.SELECT_FOLDER);
}

export async function getFolderContents(path: string): Promise<string[]> {
  return await ipcRenderer.invoke(FileSignals.READ_FOLDER, path);
}
