import Gallery from "@components/Gallery";
import { useFileStore } from "@state/files";
import { getFolderContents, selectFolder } from "lib/api";
import { FileType, getFileType, makeSrc } from "lib/parser";
import { FC, useState } from "react";

import styles from "./style.module.scss";

const HomePage: FC = () => {
  const fileStore = useFileStore();

  const [folderPath, setFolderPath] = useState("");

  const getFolderPath = async () => {
    const path = await selectFolder();
    setFolderPath(path);
    fileStore.setGalleryPath(path);
  };

  return (
    <div className={styles.galleryPage}>
      <button onClick={() => getFolderPath()}>Select Folder</button>

      <Gallery startingPath={folderPath} />
    </div>
  );
};
export default HomePage;
