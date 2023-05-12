import { Router } from "express";
import reportController from "../controllers/report.controller";

const router = Router();

router.get("/", reportController.fetchAllReports);
router.post("/", reportController.saveReport);
router.get("/daily", reportController.fetchDailyReports);
router.get("/weekly", reportController.fetchWeeklyReports);
router.get("/monthly", reportController.fetchMonthlyReports);
router.get("/:year", reportController.fetchReportsByYear);
router.delete("/:id", reportController.deleteReport);

export default router;
