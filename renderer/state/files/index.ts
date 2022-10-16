import create from "zustand";
import { persist } from "zustand/middleware";

type FileStore = {
  galleryPath: string;
  setGalleryPath: (path: string) => void;
};

export const useFileStore = create<FileStore>()(
  persist(
    (set) => ({
      galleryPath: "",
      setGalleryPath: (path) => set(() => ({ galleryPath: path })),
    }),
    { name: "file-storage" }
  )
);
