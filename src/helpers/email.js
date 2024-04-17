import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// create nodemailer transporter
// SMTP- Short Message Transfer Protocol
const transporter = nodemailer.createTransport({
    host:'smtp-relay.brevo.com',
    port: 587,
    secure: false, // false for 587, true for other ports... to avoid the blockage of our emails
    auth: {
        user: process.env.EMAIL_FROM, // generated ethereal user
        pass: process.env.SMTP_KEY // generated ethereal password
    }
});

// create sendEmail function

export const sendEmail = async (to, subject, msg) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: msg,
        html: `<body>
            <h2>${subject}</h2>
            <p>${msg}</p>
            <b>Fragrancehub mgt.</b>
        </body>`// html body
    };
    console.log(`Email sent to ${to}`);
    try {
        await transporter.sendMail(mailOptions)
    } catch (err) {
        console.log("Error sending Email" + err.message);
    }
}


// sendEmail using the transporter