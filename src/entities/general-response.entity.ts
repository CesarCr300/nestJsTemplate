export class GeneralResponse<T> {
  status: number;
  message: string;
  data: T;
}
