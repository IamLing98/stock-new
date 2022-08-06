import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IMail } from 'src/models/Mail';
import { IUser } from 'src/models/User';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    @Inject('MAIL_MODEL')
    private mailModel: Model<IMail>,
  ) {}

  async sendUserConfirmation(user: IUser) {
    console.log('Send email to: ', user);
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        fullName: user.fullName,
      },
    });
  }
}

export default EmailService;
