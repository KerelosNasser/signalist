import nodemailer from 'nodemailer'
import {WELCOME_EMAIL_TEMPLATE} from "@/lib/nodemailer/template";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sentWelcomeEmail = async ({ email, name, intro}: WelcomeEmailData) =>{
const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}',name).replace('{{intro}}',intro)
    const mailOtions = {
        from: `Signalist <signalist@keronaser.pro>`,
        to: email,
        subject: 'Welcome to Signalist',
        html: htmlTemplate
    }
    await transporter.sendMail(mailOtions)
}