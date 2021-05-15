const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'nimda',
    database: 'agendapetshop'
})

module.exports = conexao