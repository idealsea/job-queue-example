import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailProcessor } from './email.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'mail',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtpdm.aliyun.com',
        port: 25,
        auth: {
          user: 'service@verification.honghuaji.com',
          pass: 'hlxhgAliyun8X4',
        },
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EmailProcessor],
})
export class AppModule {}
