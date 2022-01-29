import nodemailer, { SendMailOptions } from 'nodemailer'
import log from './logger'
import config from 'config'

// async function createTestCreds() {
//     const creds = await nodemailer.createTestAccount()
//     log.info({ creds }, "Test SMTP")
// }

// createTestCreds()

const smtp = config.get<{user: string, pass: string, host: string, port: number, secure: boolean}>("smtp")

const transporter = nodemailer.createTransport({
    ...smtp,
    auth: { user: smtp.user, pass: smtp.pass}
})

async function SendEmail(payload:SendMailOptions){
    transporter.sendMail(payload, (err, info) => {
        if(err){
            log.error(err, "Error Sending Mail")
        }

        log.info(`Preview URL ${nodemailer.getTestMessageUrl(info)}`)
    })
}


export default SendEmail