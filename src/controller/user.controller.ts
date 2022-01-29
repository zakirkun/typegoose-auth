import {Request, Response} from 'express'
import { CreateuserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';

export async function createUserHanlder(req: Request<{}, {}, CreateuserInput>, res: Response){

    const body = req.body
    
    try {
        const user = await createUser(body)

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

        return res.status(500).json({
            "error": e
        })
    }
}