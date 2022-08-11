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
//forget password
router.post('/forgotpassword',async(req,res)=>{
   //verify customer exists in database
const verifyUser = await pool.query(`select * from customerdetailslogin where phonenum = $1 `,[req.body.mobileNum])
if(verifyUser.rows.length>0){
 return  res.status(401).json({message:`user ${req.body.mobileNum} is already exists`})
}

   
 


})








module.exports = router