const mysql = require("mysql")
const dotenv = require("dotenv")
dotenv.config();
const connection = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    })

connection.connect((err) => {
    if(err) throw err
    console.log('Database is running');
})


module.exports = {
    connection
}