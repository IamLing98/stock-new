import systemMessage from './message';

export class ReponseError {
  constructor(readonly messageCode: string, readonly message: string | null) {
    this.messageCode = systemMessage[messageCode]?.code;
    if (message) {
      this.message = message;
    } else {
      this.message = systemMessage[messageCode]?.message;
    }
  }
}

export default ReponseError;
