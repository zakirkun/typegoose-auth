import {Request, Response} from 'express'
import { CreateuserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import log from '../utils/logger';
import SendEmail from '../utils/mailer';

export async function createUserHanlder(req: Request<{}, {}, CreateuserInput>, res: Response){

    const body = req.body

    console.log( {body} )
    
    try {
        const user = await createUser(body)

        await SendEmail({
            from: "test@example.app",
            to: user.email,
            subject: "Please verify your account",
            text: `Verification code ${user.verificationCode}. Id: ${user._id}`
        })

        return res.status(201).json({
            "message": "Success created user",
            "code": 201,
            "data": user
        })
    } catch (e: any) {
        if (e.code === 11000){
            return res.status(409).json({
                "error": "Account Already Exists"
            })
        }

        log.error(e, "Internal error")

        return res.status(500).json({
            "error": e
        })
    }
}

export async function verifyUserHandler() {
    
}