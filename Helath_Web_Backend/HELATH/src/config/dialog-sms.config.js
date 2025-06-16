import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DIALOG_BASE_URL || !process.env.DIALOG_USERNAME) {
  throw new Error('Missing required Dialog SMS configuration.');
}

const dialogConfig = {
  baseUrl: process.env.DIALOG_BASE_URL,
  username: process.env.DIALOG_USERNAME,
  password: process.env.DIALOG_PASSWORD,
  loginEndpoint: process.env.LOGIN_ENDPOINT,
  smsEndpoint: process.env.SMS_ENDPOINT,
};

export default dialogConfig;
