import { Injectable } from '@nestjs/common';
import { IUser } from 'src/models/User';
const accountSid = 'AC0a57315a76ae8fd653112974e20cb87d';
const authToken = 'b67ab68be1cc9491f9929223504c5f53';

const client = require('twilio')(accountSid, authToken);

@Injectable()
export class SmsService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async sendSms(user: IUser) {
    client.messages
      .create({
        body: 'Mã xác thực tài khoản của bạn là: ' + user.otp,
        messagingServiceSid: 'MGdc77e9d521bce278fe611262597caaf4',
        to: `+84${user?.phoneNumber}`,
      })
      .then((message) => console.log(message.sid))
      .done();
  }
}

export default SmsService;
