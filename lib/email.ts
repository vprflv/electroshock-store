// lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendTwoFactorCode(email: string, code: string) {
    await transporter.sendMail({
        from: `"ElectroShock Store" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Код для входа в админку",
        html: `
            <h2>Код подтверждения</h2>
            <p>Ваш код для входа в админ-панель:</p>
            <h1 style="font-size: 42px; letter-spacing: 8px;">${code}</h1>
            <p>Код действителен <strong>15 минут</strong>.</p>
            <p>Если вы не запрашивали вход — игнорируйте это письмо.</p>
        `,
    });
}