import dotenv from 'dotenv';
dotenv.config();

if (!process.env.BREVO_SMTP_HOST || !process.env.BREVO_SMTP_USER) {
  throw new Error('Missing required Brevo SMTP configuration.');
}

const brevoConfig = {
  smtpHost: process.env.BREVO_SMTP_HOST,
  smtpPort: parseInt(process.env.BREVO_SMTP_PORT, 10) || 587,
  smtpUser: process.env.BREVO_SMTP_USER,
  smtpPassword: process.env.BREVO_SMTP_PASSWORD,
  fromEmail: process.env.BREVO_FROM_EMAIL,
};

export default brevoConfig;
