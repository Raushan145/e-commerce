import express from 'express'
import { getCurrentUser, SignIn, SignOut, signup } from '../controllers/userControllers.js';
import isAuth from '../middleware/isAuth.js';

const AuthRouter = express.Router();

AuthRouter.post("/signin", SignIn)
AuthRouter.post("/signup", signup)
AuthRouter.post("/signout", SignOut)

AuthRouter.get("/current-user",isAuth , getCurrentUser)

export default AuthRouter