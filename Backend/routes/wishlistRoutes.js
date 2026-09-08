import express from "express";
import { addToWishlist, checkWishlist, getMyWishlist, removeFromWishlist } from "../controllers/wishlistController.js";
import isAuth from "../middleware/isAuth.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add/:productId",isAuth, addToWishlist);
wishlistRouter.delete("/remove/:productId",isAuth, removeFromWishlist);
wishlistRouter.get("/",isAuth, getMyWishlist);
wishlistRouter.get("/check/:productId",isAuth, checkWishlist);

export default wishlistRouter;