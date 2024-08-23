import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Mail } from './mail.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('mail')
export class EmailProcessor {
  constructor(private readonly mailerService: MailerService) {}
  // constructor(private readonly mailService: MailerService) {}
  @Process('welcome')
  async sendWelcomeEmail(job: Job<Mail>) {
    const { data } = job;
    console.log('welcome data', data);
    const params = {
      ...data,
      template: 'welcome',
    };
    this.mailerService
      .sendMail(params)
      .then((res) => {
        console.log('send res: ', res);
      })
      .catch((err) => {
        console.log('send err: ', err);
      });
    // await this.mailerService.sendMail({
    //   ...data,
    //   // context: {
    //   //   user: data.user,
    //   // },
    // });
  }
  @Process('reset-password')
  async sendResetPasswordEmail(job: Job<Mail>) {
    const { data } = job;
    console.log('reset password data', data);
    await this.mailerService.sendMail({
      ...data,
      subject: 'reset-password',
      template: 'reset-password',
      context: {
        user: data.user,
      },
    });
  }
}
