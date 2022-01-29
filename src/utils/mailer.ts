import nodemailer from 'nodemailer'
import log from './logger'

async function createTestCreds() {
    const creds = await nodemailer.createTestAccount()
    log.info({ creds }, "Test")
}

createTestCreds()

async function SendEmail(){
    
}