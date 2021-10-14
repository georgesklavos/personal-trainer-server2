import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sgmail = require('@sendgrid/mail');
import { LoginKeys } from 'src/entities/loginKeys.entity';
import { ResetPasswordKeys } from 'src/entities/resetPasswordKeys.entity';
import { Users } from 'src/entities/users.entity';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { resetPasswordTemplate, verifyEmailTemplate } from './emailTemplates';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(LoginKeys)
    private readonly loginKeysRepository: Repository<LoginKeys>,
    private readonly userService: UserService,
    @InjectRepository(ResetPasswordKeys)
    private readonly resetPasswordKeys: Repository<ResetPasswordKeys>,
  ) {}
  async sendVerifyEmail(user: Users) {
    sgmail.setApiKey(process.env.SENDGRID_KEY_EMAIL);
    const code = (Math.floor(Math.random() * 90000) + 10000).toString();
    await this.loginKeysRepository.create({
      user,
      code,
    });

    const msg = new verifyEmailTemplate(user.email, 'laos_2111@yahoo.gr', code);
    sgmail
      .send(msg)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async verifyEmailCode(email: string, code: string) {
    const user = this.userService.findUser(email);

    const loginKey = this.loginKeysRepository.find({ where: { user, code } });

    if (!loginKey) {
      //error
    }
  }

  async sendResetPassword(user: Users) {
    sgmail.setApiKey(process.env.SENDGRID_KEY_EMAIL);
    const code = (Math.floor(Math.random() * 90000) + 10000).toString();
    await this.resetPasswordKeys.create({
      user,
      code,
    });

    const msg = new resetPasswordTemplate(
      user.email,
      'laos_2111@yahoo.gr',
      code,
    );
    sgmail
      .send(msg)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async verifyResetPasswordCode(email: string, code: string) {
    const user = this.userService.findUser(email);

    const resetPasswordKey = this.resetPasswordKeys.find({
      where: { user, code },
    });

    if (!resetPasswordKey) {
      //error
    }
  }
}
