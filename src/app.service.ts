import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Mail } from './mail.interface';
// import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  // constructor(private readonly mailerService: MailerService) {}
  constructor(@InjectQueue('mail') private readonly emailQueue: Queue) {}

  async sendWelcomeEmail(data: Mail) {
    const job = await this.emailQueue.add('welcome', data);
    return { jobId: job.id };
    // this.mailerService
    //   .sendMail(data)
    //   .then((res) => {
    //     console.log('send res: ', res);
    //   })
    //   .catch((err) => {
    //     console.log('send err: ', err);
    //   });
  }

  // async sendResetPasswordEmail(data: Mail) {
  //   const job = await this.emailQueue.add('reset-password', { data });
  //   return { jobId: job.id };
  // }

  getHello(): string {
    return 'Hello World!';
  }
}
