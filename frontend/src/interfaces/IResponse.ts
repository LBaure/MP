export interface IResponse {
  status: Status;
  message: string;
  result: object | Array<object> | null;
  title?: string | null;
  icon?: string | null;
}

export enum Status {
  OK = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
  INFO = "INFO",
}
