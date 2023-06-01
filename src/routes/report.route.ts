import { Router } from "express";
import reportController from "../controllers/report.controller";
import { fileUpload } from "../middlewares/fileUpload.middleware";

const router = Router();

router.get("/", reportController.fetchAllReports);
router.post("/", fileUpload.single("report"), reportController.saveReport);
router.get("/daily", reportController.fetchDailyReports);
router.get("/weekly", reportController.fetchWeeklyReports);
router.get("/monthly", reportController.fetchMonthlyReports);
router.get("/:year", reportController.fetchReportsByYear);
router.delete("/:id", reportController.deleteReport);
router.delete("/:id", reportController.deleteReport);
router.delete("/delete/:type", reportController.deleteSelectedReports);

export default router;
