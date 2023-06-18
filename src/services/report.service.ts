import path from "path";
import { appConfig } from "../config";
import sequelize from "../database";
import { IReport } from "./../interfaces/report.interface";
import Report from "./../models/report.model";

class ReportService {
  uploadPath = `${appConfig.BASE_URL}/src/assets/uploads`;

  async findById(id: number) {
    return Report.findByPk(id);
  }
  async findAll() {
    return Report.findAll();
  }
  async findByYear(year: number) {
    return Report.findAll({ where: { year }, order: sequelize.literal("createdAt DESC") });
  }
  async fetchDailyReports() {
    return Report.findAll({
      where: { reportType: "daily" },
      order: sequelize.literal("createdAt DESC"),
    });
  }
  async fetchWeeklyReports() {
    return Report.findAll({
      where: { reportType: "weekly" },
      order: sequelize.literal("createdAt DESC"),
    });
  }
  async fetchMonthlyReports() {
    return Report.findAll({
      where: { reportType: "monthly" },
      order: sequelize.literal("createdAt DESC"),
    });
  }

  async saveReport(newReport: IReport) {
    const { reqFile, reportType, year } = newReport;
    const { originalname: name, filename } = reqFile;
    const reportUrl = path.join(__dirname, `../assets/uploads/reports/${filename}`);

    return Report.create({ reportUrl, year: parseInt(year as string), reportType, name });
  }

  async deleteReport(id: number) {
    const reportExist = await this.findById(id);

    if (!reportExist) throw new Error("report does not exist");

    return Report.destroy({ where: { id } });
  }

  async deleteReportsByType(reportType: string) {
    return Report.destroy({ where: { reportType: reportType } });
  }
}

export default new ReportService();
