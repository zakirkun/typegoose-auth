import express from 'express'
import { createUserHanlder } from '../controller/user.controller'
import validateResource from '../middleware/validateResource'
import { createUserSchema } from '../schema/user.schema'

const router = express.Router()

router.post("/api/users", validateResource(createUserSchema), createUserHanlder)

export default router