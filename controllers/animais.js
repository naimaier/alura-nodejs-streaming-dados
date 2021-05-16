const Animal = require('../models/animais')

module.exports = app => {
    app.post('/animal', (req, res) => {
        const animal = req.body

        Animal.adiciona(animal, res)
    })
}