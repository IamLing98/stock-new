import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IMail } from 'src/models/Mail';
import { IUser } from 'src/models/User';
import Vonage from '@vonage/server-sdk';

@Injectable()
export class SmsService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async sendSms(user: IUser, text: string) {
    const from = 'Stock App';
    const to = user?.phoneNumber;
    // // this.smsService.message?.sendSms(
    // //   from,
    // //   to,
    // //   text,
    // //   {},
    // //   (err, responseData): any => {
    // //     if (err) {
    // //       console.log(err);
    // //     } else {
    // //       if (responseData.messages[0]['status'] === '0') {
    // //         console.log('Message sent successfully.');
    // //       } else {
    // //         console.log(
    // //           `Message failed with error: ${responseData.messages[0]['error-text']}`,
    // //         );
    // //       }
    // //     }
    // //   },
    // );
  }
}

export default SmsService;
