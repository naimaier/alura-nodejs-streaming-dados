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

    altera(id, valores) {
        const sql = `UPDATE Atendimentos SET ? WHERE id = ?`

        return query(sql, [valores, id])
    }

    apaga(id) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?'

        return query(sql, id)
    }
}

module.exports = new Atendimento()