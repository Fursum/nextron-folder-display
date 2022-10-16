export enum FileType {
  VIDEO,
  IMAGE,
  FOLDER,
  NOT_SUPPORTED,
}

const SUPPORTED_IMAGE_EXT = [
  "jpg",
  "jpeg",
  "png",
  "apng",
  "gif",
  "webp",
  "svg",
  "avif",
];
const SUPPORTED_VIDEO_EXT = ["mp4", "m4v", "flv", "webm", "ogg"];

export function getFileType(path: string) {
  const splitName = path.split(".");
  if (splitName.length === 1) return FileType.FOLDER;

  const extension = splitName.pop()?.toLowerCase() || "";
  if (SUPPORTED_IMAGE_EXT.includes(extension)) return FileType.IMAGE;
  if (SUPPORTED_VIDEO_EXT.includes(extension)) return FileType.VIDEO;

  return FileType.NOT_SUPPORTED;
}

/* Converts path to custom local file protocol */
export function makeSrc(path: string) {
  return "local-file-protocol://getFile/" + path;
}
