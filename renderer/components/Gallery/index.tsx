import { getFolderContents } from "lib/api";

import { FC, useEffect, useMemo, useState } from "react";
import FileDisplay from "./FileDisplay";

import styles from "./style.module.scss";

const Gallery: FC<{ startingPath: string }> = ({ startingPath }) => {
  // Gallery component can change its own path
  const [localPath, setLocalPath] = useState(startingPath);
  const [files, setFiles] = useState<string[]>([]);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    setLocalPath(startingPath);
    setDepth(0);
  }, [startingPath]);

  // Fetch folder contents from Electron API
  useEffect(() => {
    if (localPath) getFolderContents(localPath).then((res) => setFiles(res));
  }, [localPath]);

  function openFolder(path: string) {
    setDepth((oldDepth) => oldDepth + 1);
    setLocalPath(path);
  }

  function returnToParentFolder() {
    setDepth((oldDepth) => oldDepth - 1);
    const parentFolderPath = localPath.split("\\").slice(0, -1).join("\\");
    setLocalPath(parentFolderPath);
  }

  const FileList = useMemo(() => {
    return files.map((file) => {
      return (
        <FileDisplay
          path={localPath + "\\" + file}
          key={file}
          openFolder={openFolder}
        />
      );
    });
  }, [files]);

  return (
    <div className={styles.gallery}>
      <h2>Gallery</h2>
      <div className={styles.pathNav}>
        <button
          className={styles.return}
          onClick={() => returnToParentFolder()}
          disabled={depth === 0}
        >
          Return
        </button>
        <h3>{localPath || "No Folder Selected"}</h3>
      </div>
      {FileList}
    </div>
  );
};

export default Gallery;
