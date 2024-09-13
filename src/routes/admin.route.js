import express from "express";
import { AdminControllers } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/login", AdminControllers.adminLogin);
router.get("/check-auth", AdminControllers.checkAuth);

export default router;
