const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "@Ravind95",
    port: 5432,
    host: "localhost",
    database: "pernstack"

})



module.exports = pool