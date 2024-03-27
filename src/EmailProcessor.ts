import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Mail } from './mail.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('emailSending')
export class EmailProcessor {
  constructor(private readonly mailService: MailerService) {}
  @Process('welcome')
  async sendWelcomeEmail(job: Job<Mail>) {
    const { data } = job;
    console.log('welcome data', data);
    await this.mailService.sendMail({
      ...data,
      subject: 'welcome',
      template: 'welcome',
      context: {
        user: data.user,
      },
    });
  }
  @Process('reset-password')
  async sendResetPasswordEmail(job: Job<Mail>) {
    const { data } = job;
    console.log('reset password data', data);
    await this.mailService.sendMail({
      ...data,
      subject: 'reset-password',
      template: 'reset-password',
      context: {
        user: data.user,
      },
    });
  }
}
