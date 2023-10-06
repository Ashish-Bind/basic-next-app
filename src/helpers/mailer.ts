import UserModel from '@/models/userModel'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'

export async function sendMail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10)

    if (emailType === 'VERIFY') {
      await UserModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      })
    } else if (emailType === 'RESET') {
      await UserModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      })
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'f2893789c7c819',
        pass: '476eaa14a2c651',
      },
    })

    const mailOptions = {
      from: 'bindashish343@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verfiy your email' : 'Reset your password',
      html: `<p>Click <a href='${
        process.env.DOMAIN
      }/verify?token=${hashedToken}'>here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      }</p>`,
    }

    const mailResponse = await transport.sendMail(mailOptions)

    return mailResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}
