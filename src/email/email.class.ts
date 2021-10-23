export abstract class emailTemplate {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;

  replaceValues(html, values): string {
    html = html.toString();
    for (const key in values) {
      html = html.replace(`{${key}}`, values[key]);
    }

    return html;
  }
}
