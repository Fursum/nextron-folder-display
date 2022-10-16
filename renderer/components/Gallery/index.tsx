import Folder from "@components/SVGComponents/Folder";
import { getFolderContents } from "lib/api";
import { FileType, getFileType, makeSrc } from "lib/parser";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

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
        <RenderFile
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

const RenderFile: FC<{ path: string; openFolder: (path: string) => void }> = ({
  path,
  openFolder,
}) => {
  const ref = useRef(null);
  const intersection = useIntersectionObserver(ref, {
    threshold: 0,
  });

  const File: FC = () => {
    if (!intersection?.isIntersecting) return <>Not intersecting</>;

    const fileType = getFileType(path);
    const url = makeSrc(path.replaceAll("\\", "/"));

    if (fileType === FileType.VIDEO) {
      return <video src={url} autoPlay loop muted />;
    }
    if (fileType === FileType.IMAGE) {
      return <img src={url} />;
    }
    if (fileType === FileType.FOLDER)
      return (
        <button onClick={() => openFolder(path)}>
          <Folder />
        </button>
      );
    return <div>Not supported.</div>;
  };

  return (
    <button ref={ref} className={styles.element}>
      <span>{path.split("\\").pop()}</span>
      {<File />}
    </button>
  );
};
export default Gallery;
