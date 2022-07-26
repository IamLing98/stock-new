import systemMessage from './message';

export class ReponseData {
  constructor(
    readonly messageCode: string,
    readonly message: string | null,
    readonly payload: any,
  ) {
    this.payload = payload;
    this.messageCode = systemMessage[messageCode]?.code;
    if (message) {
      this.message = message;
    } else {
      this.message = systemMessage[messageCode]?.message;
    }
  }
}

export default ReponseData;
