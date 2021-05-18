const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (request, response) => {
        Atendimento.lista()
            .then(resultados => response.json(resultados))
            .catch(erros => response.status(400).json(erros))
    })

    app.get('/atendimentos/:id', (request, response) => {
        const id = parseInt(request.params.id)

        Atendimento.buscaPorId(id)
            .then(resultados => response.json(resultados))
            .catch(erros => response.status(400).json(erros))
    })
    
    app.post('/atendimentos', (request, response) => {
        const atendimento = request.body

        Atendimento.adiciona(atendimento)
            .then(resultados => response.status(201).json(resultados))
            .catch(erros => response.status(400).json(erros))
    })

    app.patch('/atendimentos/:id', (request, response) => {
        const id = parseInt(request.params.id)
        const valores = request.body

        Atendimento.altera(id, valores)
            .then(resultados => response.json(resultados))
            .catch(erros => response.status(400).json(erros))
    })

    app.delete('/atendimentos/:id', (request, response) => {
        const id = parseInt(request.params.id)
        
        Atendimento.apaga(id)
            .then(resultados => response.json(resultados))
            .catch(erros => response.status(400).json(erros))
    })
}
// Estamos exportando uma funcao que recebe app como parametro