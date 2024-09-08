import nodemailer from 'nodemailer';

export const sendMagicLinkEmail = async (email: string, magicLink: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Magic Login Link',
    text: `Click the link to login: ${magicLink}`,
  };

  await transporter.sendMail(mailOptions);
};
