const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, response) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual à data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        // retorna o campo quando este for inválido
        const existemErros = erros.length
        // Se lengh for 0 a variável equivale a false

        if (existemErros) {
            response.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            // Criamos um objeto novo para ser evitar qualquer problema em outras partes do codigo
    
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    response.status(400).json(erro)
                    // 400: Bad request. O Cliente mandou algum dado inválido
                } else {
                    response.status(201).json(atendimento)
                    // O 'resultados' mostra o insertId entre outros
                    // 201 created
                }
            })
        }
    }

    lista(response) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                response.status(400).json(erro)
            } else {
                response.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, response) {
        const sql = 'SELECT * FROM Atendimentos WHERE id = ?'

        conexao.query(sql, id, (erro, respostas) => {
            const atendimento = respostas[0]
            
            if (erro) {
                response.status(400).json(erro)
            } else {
                response.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, response) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = `UPDATE Atendimentos SET ? WHERE id = ?`

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                response.status(400).json(erro)
            } else {
                response.status(200).json({...valores, id})
            }
        })
    }

    apaga(id, response) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                response.status(400).json(erro)
            } else {
                response.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento