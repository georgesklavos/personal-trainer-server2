import { emailTemplate } from './email.class';
// import * as verifyEmailHtml from './emailHtmlTemplates/verifyEmail.html';
// import * as resetPasswordHtml from './emailHtmlTemplates/resetPassword.html';

export class verifyEmailTemplate extends emailTemplate {
  subject: 'Verify email';
  text: 'Verify email address';
  constructor(toEmail, fromEmail, values) {
    super();
    this.to = toEmail;
    this.from = fromEmail;
    // this.html = this.replaceValues(verifyEmailHtml, values);
  }
}

export class resetPasswordTemplate extends emailTemplate {
  subject: 'Reset password';
  text: 'Reset your password';
  constructor(toEmail, fromEmail, values) {
    super();
    this.to = toEmail;
    this.from = fromEmail;
    // this.html = this.replaceValues(resetPasswordHtml, values);
  }
}
