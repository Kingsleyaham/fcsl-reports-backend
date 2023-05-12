import { IReport } from "./../interfaces/report.interface";
import Report from "./../models/report.model";

class ReportService {
  async findById(id: number) {
    return Report.findByPk(id);
  }
  async findAll() {
    return Report.findAll();
  }
  async findByYear(year: number) {
    return Report.findAll({ where: { year } });
  }
  async fetchDailyReports() {
    return Report.findAll({ where: { type: "daily" } });
  }
  async fetchWeeklyReports() {
    return Report.findAll({ where: { type: "weekly" } });
  }
  async fetchMonthlyReports() {
    return Report.findAll({ where: { type: "monthly" } });
  }

  async saveReport(newReport: IReport, reqFile: any) {}

  async deleteReport(id: number) {
    const reportExist = await this.findById(id);

    if (!reportExist) throw new Error("report does not exist");

    return Report.destroy({ where: { id } });
  }
}

export default new ReportService();
