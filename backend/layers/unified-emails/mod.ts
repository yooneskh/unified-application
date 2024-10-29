import { IUnifiedApp } from 'unified-app';
import { Config } from 'config';
import { sendResendMail } from '../../lib/resend-agent/mod.ts';
import { sendBrevoMail } from '../../lib/brevo-agent/mod.ts';


declare module 'unified-app' {
  interface IUnifiedApp {
    sendEmail: (email: { to: string[], subject: string, body: string }) => Promise<void>;
  }
}


export function install(app: IUnifiedApp) {

  app.sendEmail = async (email) => {
    
    let resendError;
    let brevoError;

    try {
      return await sendResendMail({
        authorization: Config.resend.authorization,
        from: Config.resend.from,
        to: email.to,
        subject: email.subject,
        text: email.body,
      });
    }
    catch (error) {
      resendError = error;
    }

    try {
      return await sendBrevoMail({
        authorization: Config.brevo.authorization,
        sender: Config.brevo.sender,
        to: email.to,
        subject: email.subject,
        htmlContent: email.body,
      });
    }
    catch (error) {
      brevoError = error;
    }


    if (resendError && brevoError) {
      console.error('mail error resend', resendError);
      console.error('mail error brevo', brevoError);
      throw new AggregateError([ resendError, brevoError ], 'could not send email');
    }

  }

}