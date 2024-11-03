import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewMessageNotification(message: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const { data } = await resend.emails.send({
      from: 'Message portefolio <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `✨ Nouveau message de ${message.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9fafb;
                border-radius: 8px;
              }
              .header {
                background: linear-gradient(to right, #3b82f6, #8b5cf6);
                color: white;
                padding: 20px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .content {
                padding: 20px;
                background: white;
                border-radius: 0 0 8px 8px;
              }
              .field {
                margin-bottom: 15px;
              }
              .label {
                font-weight: bold;
                color: #4b5563;
              }
              .message {
                white-space: pre-wrap;
                background-color: #f3f4f6;
                padding: 15px;
                border-radius: 6px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Nouveau message reçu</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">De:</div>
                  <div>${message.name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div>${message.email}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="message">${message.message}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    });
  } catch (error) {
    console.error('Erreur d\'envoi d\'email:', error);
    throw error;
  }
};

