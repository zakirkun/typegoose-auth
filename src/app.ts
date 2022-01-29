require('dotenv').config()
import express from 'express'
import config from 'config'
import connectToDb from './utils/ConnectToDb'
import log from './utils/logger'
import routes from './routes'

const app = express()
const PORT = config.get("PORT")

app.use(express.json())

app.use(routes)

app.listen(PORT, () => {
    log.info(`App run on PORT ${PORT}`)
    connectToDb()
})