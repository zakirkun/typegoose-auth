import { getModelForClass, modelOptions, prop, Severity, pre} from "@typegoose/typegoose";
import { DocumentType } from "@typegoose/typegoose/lib/types";
import argon2d from "argon2";
import { nanoid } from "nanoid";
import log from "../utils/logger";

@pre<User>("save", async function(){
    if(!this.isModified("password")){
        return
    }

    const hash = await argon2d.hash(this.password)

    this.password = hash
    return
})
@modelOptions({
    schemaOptions:{
        timestamps: true
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class User {
    @prop({ lowercase: true, required: true, unique: true})
    email : string

    @prop({ required: true})
    firstName : string

    @prop({ required: true})
    lastName : string

    @prop({ required: true})
    password : string

    @prop({ required: true, default: () => nanoid()})
    verificationCode : string

    @prop()
    passwordResetCode : string | null

    @prop({ default: false})
    verified: boolean

    async validationPassword(this: DocumentType<User>, candidatePassword: string){
        try {
            return await argon2d.verify(this.password, candidatePassword)
        } catch (e) {
            log.error(e, "Could not validate password")
            return false
        }
    }
}

const UserModel = getModelForClass(User)

export default UserModel