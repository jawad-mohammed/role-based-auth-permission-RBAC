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
router.get('/api/v1/get',async(req,res)=>{
    const getAllUsers = await pool.query(`select * from customerdetailslogin`)
    res.json(getAllUsers.rows)
})

//get otp numb
router.post('/api/v1/otp',async(req,res)=>{
  const otpNum=   Math.floor(100000 + Math.random() * 900000);  

  res.json(otpNum)
  
})





//post implementing jwt token register new user
router.post('/post',async(req,res)=>{
//verify customer exists in database
const verifyUser = await pool.query(`select * from customerdetailslogin where email = $1 `,[req.body.Email])
if(verifyUser.rows.length>0){
 return  res.status(401).json({message:`user ${req.body.Name} is already exists`})
}
//not found the hash the password and store in database
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.Password,salt)

  const newUser = await pool.query(`insert into customerdetailslogin (name,email,password,confirmpassword,phonenum,bike,car) 
  values($1,$2,$3,$4,$5,$6,$7) returning * `,
  [req.body.Name,req.body.Email,hashedPassword,req.body.ConfirmPassword,req.body.PhoneNum,req.body.bike,req.body.car])

const jwtToken = jwtAuth(newUser.rows[0].user_id)
  res.status(201).json({jwtToken})
console.log(req.body);
console.log(jwtToken);

})
//login route

router.post('/api/v1/login',async(req,res)=>{
  //check the user exists in database
  //if doesnot exists throw error
const verifyUser = await pool.query(`select * from customerdetailslogin where email = $1`, [req.body.Email])
if(verifyUser.rows.length ===0){
  return res.status(401).json({message:`user  ${req.body.Email} not found`})
}
//user found in database
//compare user password with database password
const loginUser = await bcrypt.compare(req.body.Password,verifyUser.rows[0].password)

//if password in incorrect throw error
if(!loginUser) {
  return res.status(401).json({message:"incorrect password"})
  }
//if password correct
const jwtToken = jwtAuth(verifyUser.rows[0].user_id)
res.json({jwtToken,message:` Welcome ${req.body.Email}`})


})















//update //put  
router.put('/api/v1/put/:id',async(req,res)=>{
  const {id} = req.params
const updateUser = await pool.query(`update customerdetailslogin set name =$1, email=$2, password=$3, confirmpassword=$4, phonenum=$5 where customerid =$6 `,
[req.body.Name,req.body.Email,req.body.Password,req.body.ConfirmPassword,req.body.PhoneNum,id])
res.json('updated')
console.log(req.body);
})


//delete
router.delete('/api/v1/delete/:id',async(req,res)=>{
  const {id} = req.params
  const deleteUser = await pool.query(`delete from customerdetailslogin where customerid =$1 `,[id])
 res.json('deleted')

})


module.exports = router