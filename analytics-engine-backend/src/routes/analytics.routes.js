import express from "express";
import { runAnalyticsQuery } from "../controllers/analytics.controller.js";

const router = express.Router();

router.post("/query", runAnalyticsQuery);

export default router;
