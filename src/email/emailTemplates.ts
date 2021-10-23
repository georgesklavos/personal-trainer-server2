import { emailTemplate } from './email.class';
import * as fs from 'fs';
import { join } from 'path';

export class verifyEmailTemplate extends emailTemplate {
  subject: 'Verify email';
  text: 'Verify email address';
  constructor(toEmail, fromEmail, translations, code) {
    super();
    this.to = toEmail;
    this.from = fromEmail;
    const html = fs.readFileSync(
      join(__dirname, '/../../templates/verifyEmail.html'),
    );
    this.subject = translations.subject;
    this.text = 'Verify email address';
    translations.code = code;
    this.html = this.replaceValues(html, translations);
  }
}

export class resetPasswordTemplate extends emailTemplate {
  subject: 'Reset password';
  text: 'Reset your password';
  constructor(toEmail, fromEmail, values) {
    super();
    this.to = toEmail;
    this.from = fromEmail;

    fs.readFile(
      __dirname + '../templates/resetPassword.html',
      function (error, html) {
        if (error) {
          throw error;
        }

        this.html = this.replaceValues(html, values);
      },
    );
  }
}
