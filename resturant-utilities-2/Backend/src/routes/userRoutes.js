// routes/userRoutes.js
import express from "express";
import { register,login,checkUser,logout } from "../controllers/userController.js";
import authenticate from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", register );
userRouter.post("/login", login );
userRouter.get("/check-user",authenticate, checkUser ); 
userRouter.get("/logout",authenticate, logout ); 

export default userRouter;
