const query = require('../infraestrutura/database/queries')

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?'

        return query(sql, atendimento)
        // retornamos a promise para quem chamou a funcao lidar com ela
    }

    lista() {
        const sql = 'SELECT * FROM Atendimentos'

        return query(sql)
    }

    buscaPorId(id) {
        const sql = 'SELECT * FROM Atendimentos WHERE id = ?'

        return query(sql, id)
    }
}

module.exports = new Atendimento()