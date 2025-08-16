import nodemailer from "nodemailer"

export const sendMessage = async (name, email, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: email, // sender email (your email)
        to: process.env.EMAIL_USER, // recipient email
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });
};
