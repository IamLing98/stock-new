import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import Service from 'src/services/EmailService';
import { join } from 'path';
import { emailConfig } from 'src/utils/constants';
import Provider from 'src/providers/MailProvider';
import { DatabaseModule } from 'src/config/database.module';

@Module({
  imports: [
    DatabaseModule,
    MailerModule.forRoot({
      transport: {
        host: emailConfig.emailHost.host,
        secure: false,
        auth: {
          user: emailConfig.emailHost.auth.user,
          pass: emailConfig.emailHost.auth.pass,
        },
      },
      defaults: {
        from: emailConfig.defaults.from,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [Service, ...Provider],
  exports: [Service], // 👈 export for DI
})
export default class MailModule {}
