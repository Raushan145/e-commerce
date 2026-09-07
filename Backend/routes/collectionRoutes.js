import express from "express";

import { createCollection, updateCollection, deleteCollection,getCollections, getCollectionById,} from "../controllers/collectionController.js";
import upload from "../middleware/multer.js";

const collectionRouter = express.Router();

collectionRouter.post("/create", upload.single("image"), createCollection);
collectionRouter.get("/", getCollections);
collectionRouter.get("/:id", getCollectionById);
collectionRouter.put("/update/:id", upload.single("image"), updateCollection);
collectionRouter.delete("/delete/:id", deleteCollection);


export default collectionRouter;
