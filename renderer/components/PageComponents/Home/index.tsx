import Gallery from "@components/Gallery";
import { selectFolder } from "lib/api";
import { FC, useState } from "react";

import styles from "./style.module.scss";

const HomePage: FC = () => {
  const [folderPath, setFolderPath] = useState("");

  const getFolderPath = async () => {
    const path = await selectFolder();
    setFolderPath(path);
  };

  return (
    <div className={styles.galleryPage}>
      <button onClick={() => getFolderPath()}>Select Folder</button>

      <Gallery startingPath={folderPath} />
    </div>
  );
};
export default HomePage;
