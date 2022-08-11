const express = require('express')
const router = express.Router()
const pool = require('../model/db')
// @post the product
router.post('/api/products/post',async(req,res)=>{
const verifyUser = await pool.query(`select * from products `)



const newProduct = await pool.query(`insert into products(name,price,location,shipping_cost,is_available) values($1,$2,$3,$4,$5) returning *`,
[req.body.Name,req.body.Price,req.body.Location,req.body.ShippingCost,req.body.Available])
res.json(newProduct.rows)
console.log(req.body);
})

// @put the product

// @getthe product
router.get('/api/products/get',async(req,res)=>{
    const getAllProducts = await pool.query(`select * from products`)
    res.json(getAllProducts.rows)
    console.log(getAllProducts.rows)
})

// @deletethe product



module.exports = router