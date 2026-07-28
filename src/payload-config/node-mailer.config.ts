import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

export const nodemailerConfig = nodemailerAdapter({
  defaultFromAddress: process.env.FROM_ADDRESS ?? '',
  defaultFromName: process.env.FROM_NAME ?? '',
  transportOptions: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT), // Port SMTP (thường là 587 hoặc 465)
    secure: true, // true nếu dùng port 465, false nếu dùng các port khác
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
})
