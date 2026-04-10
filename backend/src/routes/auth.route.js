import express  from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controller/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const authrouter =express.Router()


authrouter.post("/signup",signup)
authrouter.post("/login",login)
authrouter.post("/logout",logout)



authrouter.put("/update-profile", protectRoute, updateProfile);

authrouter.get("/check", protectRoute, checkAuth);

export default authrouter;