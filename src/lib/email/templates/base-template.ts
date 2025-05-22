// src/lib/email/templates/base-template.ts

/**
 * Base email template with a responsive design
 * @param content - The content to insert into the template
 * @param buttonText - The text for the call-to-action button
 * @param buttonUrl - The URL for the call-to-action button
 * @returns HTML email template
 */
export function baseTemplate(
  title: string,
  preheader: string,
  content: string,
  buttonText: string,
  buttonUrl: string,
  footerText: string = "© FortressOS. All rights reserved."
): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <meta name="color-scheme" content="light">
      <meta name="supported-color-schemes" content="light">
      <style>
        @media only screen and (max-width: 600px) {
          .container {
            width: 100% !important;
          }
          .content {
            padding: 24px !important;
          }
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #333333;
          background-color: #f7f7f7;
          -webkit-font-smoothing: antialiased;
        }
        .preheader {
          display: none !important;
          visibility: hidden;
          opacity: 0;
          color: transparent;
          height: 0;
          width: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #0070f3;
          padding: 24px;
          text-align: center;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #ffffff;
        }
        .content {
          padding: 32px;
          line-height: 1.6;
        }
        .button {
          display: inline-block;
          background-color: #0070f3;
          color: #ffffff !important;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: 500;
          margin: 16px 0;
        }
        .footer {
          background-color: #f9f9f9;
          padding: 16px 32px;
          text-align: center;
          color: #666666;
          font-size: 14px;
        }
        hr {
          border: none;
          border-top: 1px solid #eeeeee;
          margin: 24px 0;
        }
      </style>
    </head>
    <body>
      <div class="preheader">${preheader}</div>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 48px 16px;">
        <tr>
          <td align="center">
            <div class="container">
              <div class="header">
                <div class="logo">FortressOS</div>
              </div>
              <div class="content">
                ${content}
                <div style="text-align: center;">
                  <a href="${buttonUrl}" class="button">${buttonText}</a>
                </div>
                <hr>
                <p style="color: #666666; font-size: 14px;">
                  If you didn't request this email, please ignore it or contact support if you have concerns.
                </p>
              </div>
              <div class="footer">
                ${footerText}
              </div>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
