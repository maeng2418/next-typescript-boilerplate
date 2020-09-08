// throw new Error로 던진 에러는 전부 sentry에 등록되므로 커스텀한다.
class CustomError extends Error {
  status: number;
  message: string;
  stack: string;
  constructor(status: number, message: string, stack: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.stack = stack;
  }
}

export default CustomError;
