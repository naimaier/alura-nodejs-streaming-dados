const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = () => {
    const app = express()

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    // Adicionamos parser de formulário html e json nas configurações do servidor
    // para poder utilizá-los em todas as requisições
    
    consign()
        .include('controllers')
        .into(app)

    return app
}