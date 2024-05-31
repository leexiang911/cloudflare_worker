import { Resend } from "resend";


/**
 * 发送邮件验证码
 * @param email 邮箱
 * @param code 随机验证码
 * @returns 
 */
export async function sendEmail(email: string, code: number | string) {

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .header {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
            }
            .content {
                margin: 20px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Welcome to Our Service</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>Thank you for choosing our service. We are committed to providing you with the best experience possible.</p>
            <p>If you have any questions or need assistance, please do not hesitate to contact us.</p>
            <h1>Your Verification Code  <p class='code' style="font-size: 2.5rem;text-align: center;color: cadetblue;letter-spacing:1rem;">${code}</p> </h1>
            <p>Best Regards,</p>
            <p>Your Service Team</p>
        </div>
    </body>
    </html>
    `;
    const resend = new Resend('re_8BwRvxAs_9Pp9py2NLgKhTwJyDoTTkGAJ');
    const { data, error } = await resend.emails.send({
        from: 'lice@api.lice.dev',
        to: email,
        subject: 'Your Verification Code | 请查收您的验证码',
        html: htmlContent,

    });
    if (data) {
        console.log('Email sent successfully');
        const res = {
            code,
            email,
            date: new Date().toISOString()
        }
        return JSON.stringify(res);
    } else {
        return Response.json({ data, error });
    }
}