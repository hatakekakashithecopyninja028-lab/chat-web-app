import express from "express";

import { getMessages, getUsersForSidebar, sendMessage } from "../controller/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const messagerouter = express.Router();

messagerouter.get("/users", protectRoute, getUsersForSidebar);
messagerouter.get("/:id", protectRoute, getMessages);

messagerouter.post("/send/:id", protectRoute, sendMessage);

export default messagerouter;