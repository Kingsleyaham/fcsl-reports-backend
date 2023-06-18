export interface IReqFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface IReport {
  reqFile: IReqFile;
  reportType: string;
  year: number | string;
}
