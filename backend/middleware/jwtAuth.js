
const jwt = require('jsonwebtoken')

function jwtAuthentication(user_id){
const accessToken = 'jhbdhsbchdscbjhdbchjd';
const refreshToken = 'sudcvjdsbjkjksdahuewj4j4j';
    
const payload={
    user:{
        id:user_id
    }
}

const accessjwtTOKEN = jwt.sign(payload,accessToken,{expiresIn:'30s'})
const refreshjwtToken = jwt.sign(payload,refreshToken,{expiresIn:'5m'})

return {accessjwtTOKEN,refreshjwtToken}
}
module.exports = jwtAuthentication