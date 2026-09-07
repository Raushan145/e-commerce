import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const currentFile = fileURLToPath(import.meta.url);
const backendRoot = path.resolve(path.dirname(currentFile), "..");
const uploadDirectory = path.join(backendRoot, "public");

fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

export default upload;