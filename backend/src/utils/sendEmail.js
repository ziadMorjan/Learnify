import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  if (!to || !subject) {
    throw new Error('Email payload missing required fields');
  }

  await transporter.sendMail({
    from: `"Learnify" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};
