import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useIntersectionObserver, useOnClickOutside } from "usehooks-ts";
import { FileType, getFileType, makeSrc } from "lib/parser";
import Folder from "@components/SVGComponents/Folder";

import styles from "./style.module.scss";

const File: FC<{
  intersecting?: boolean;
  path: string;
  openFolder: (path: string) => void;
  hasControls?: boolean;
}> = ({ intersecting, path, openFolder, hasControls }) => {
  if (!intersecting) return <>Not intersecting</>;

  const fileType = getFileType(path);
  const url = makeSrc(path.replaceAll("\\", "/"));

  if (fileType === FileType.VIDEO) {
    return <video src={url} autoPlay loop muted controls={hasControls} />;
  }
  if (fileType === FileType.IMAGE) {
    return <img src={url} />;
  }
  if (fileType === FileType.FOLDER)
    return (
      <a onClick={() => openFolder(path)}>
        <Folder />
      </a>
    );
  return <h4>Not supported.</h4>;
};

const FileDisplay: FC<{ path: string; openFolder: (path: string) => void }> = ({
  path,
  openFolder,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef(null);
  const intersection = useIntersectionObserver(ref, {
    threshold: 0,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <LargeDisplayModal closeModal={() => closeModal()}>
          <File openFolder={openFolder} path={path} intersecting hasControls />
        </LargeDisplayModal>
      )}
      <button ref={ref} className={styles.element} onClick={() => openModal()}>
        <span>{path.split("\\").pop()}</span>
        <File
          openFolder={openFolder}
          path={path}
          intersecting={intersection?.isIntersecting}
        />
      </button>
    </>
  );
};

const LargeDisplayModal: FC<{
  closeModal: () => void;
  children: ReactNode;
}> = ({ closeModal, children }) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => closeModal());

  // Hijack scroll event to prevent scrolling
  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    document.addEventListener("wheel", preventScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", preventScroll);
    };
  }, []);

  return (
    <dialog className={styles.modalBg} open>
      <button>Close</button>
      <div ref={ref}>{children}</div>
    </dialog>
  );
};

export default FileDisplay;
