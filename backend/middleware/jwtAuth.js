
const jwt = require('jsonwebtoken')

function jwtAuthentication(user_id){
const jwtSecret = 'jhbdhsbchdscbjhdbchjd'
    const payload={
    user:{
        id:user_id
    }
}

return jwt.sign(payload,jwtSecret,{expiresIn:'1hr'})
}
module.exports = jwtAuthentication