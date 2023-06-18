import { Request, Response } from "express";
import reportService from "../services/report.service";
import { MESSAGES } from "../constants";

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
  async saveReport(req: Request, res: Response) {
    try {
      const report = await reportService.saveReport({ ...req.body, reqFile: req.file });

      res.status(201).json({ success: true, message: MESSAGES.UPLOAD_SUCCESS });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
  async deleteReport(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await reportService.deleteReport(id);
      res.status(200).json({ success: true, message: MESSAGES.DELETE_SUCCESS });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
  async deleteSelectedReports(req: Request, res: Response) {
    try {
      const reportType = req.params.type;
      await reportService.deleteReportsByType(reportType);
      res.status(200).json({ success: true, message: MESSAGES.DELETE_SUCCESS });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
}

export default new ReportController();
