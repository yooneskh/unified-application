

interface IBrevoMailSendOptions {
  authorization: string;
  sender: unknown;
  to: string[];
  subject: string;
  htmlContent: string;
}

export async function sendBrevoMail(options: IBrevoMailSendOptions) {

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': options.authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: options.sender,
      to: options.to,
      subject: options.subject,
      htmlContent: options.htmlContent,
    }),
  });

  if (!response.ok) {
    console.error(await response.text());
    throw new Error('could not send email: ' + await response.text());
  }

}
