import express from "express";
import { AdminControllers } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/login", AdminControllers.adminLogin);
router.get("/auth-check", AdminControllers.checkAuth);
router.post("/change-password", AdminControllers.changePassword);

export default router;
