import { Request, Response } from "express";
import reportService from "../services/report.service";

class ReportController {
  async fetchAllReports(req: Request, res: Response) {
    try {
      const reports = await reportService.findAll();
      res.status(200).json({ success: true, reports });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
  async fetchDailyReports(req: Request, res: Response) {
    try {
      const reports = await reportService.fetchDailyReports();
      res.status(200).json({ success: true, reports });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
  async fetchWeeklyReports(req: Request, res: Response) {
    try {
      const reports = await reportService.fetchWeeklyReports();
      res.status(200).json({ success: true, reports });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
  async fetchMonthlyReports(req: Request, res: Response) {
    try {
      const reports = await reportService.fetchMonthlyReports();
      res.status(200).json({ success: true, reports });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
  async fetchReportsByYear(req: Request, res: Response) {
    try {
      // const { year }: IReportQuery = req.query;
      // const reports = await reportService.findByYear(year);
      // res.status(200).json({ success: true, reports });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
  async saveReport(req: Request, res: Response) {}
  async deleteReport(req: Request, res: Response) {}
}

export default new ReportController();
