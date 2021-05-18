const query = require('../infraestrutura/database/queries')

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?'

        return query(sql, atendimento)
        // retornamos a promise para quem chamou a funcao lidar com ela
    }
}

module.exports = new Atendimento()