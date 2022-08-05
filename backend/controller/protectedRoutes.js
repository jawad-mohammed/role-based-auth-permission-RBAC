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
    // const verifyUser = await pool.query(`select * from customerdetailslogin where phonenum =$1`, [req.body.mobileNum])
    // if(verifyUser.rows.length=== 0) {
    //     res.json({message:'user does not exists'})
    // }
    let val = Math.floor(1000 + Math.random() * 9000);
   res.json({mess:val})




})








module.exports = router