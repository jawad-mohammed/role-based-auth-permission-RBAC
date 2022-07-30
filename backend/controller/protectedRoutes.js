const express = require('express')
const router = express.Router()
//const session = require('express-session')

const pool = require('../model/db')
const cors = require('cors')
const bcrypt = require('bcrypt')

const jwtAuth = require('../middleware/jwtAuth')
//middlewares
router.use(cors())
//@get req









module.exports = router