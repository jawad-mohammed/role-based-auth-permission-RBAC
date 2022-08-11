const express = require('express')
const app = express()
const cors = require('cors')

//middlewares
app.use(cors())
 app.use(express.json())
// app.use(express.urlencoded({extended:true}))
//route
app.use('/routes',require('./controller/routes'))
app.use('/protectedroutes',require('./controller/protectedRoutes'))
app.use('/products',require('./controller/productRoutes'))







app.listen(8000,console.log(`server is listening on 8000`))