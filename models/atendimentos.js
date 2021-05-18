const axios = require('axios')
const moment = require('moment')
const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorios/atendimentos')

class Atendimento {
    constructor() {
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = ({tamanho}) => tamanho >= 5

        this.valida = parametros => this.validacoes.filter( campo => {
                const { nome } = campo
                const parametro = parametros[nome]

                return !campo.valido(parametro)
            })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual à data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        }

        const erros = this.valida(parametros)
        const existemErros = erros.length
        // Se lengh for 0 a variável equivale a false

        if (existemErros) {
            return new Promise((resolve, reject) => {
                reject(erros)
            })
            // Quando queremos gerar um erro então, trocamos a response por uma nova promise,
            // que é o que o controller espera
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            // Criamos um objeto novo para ser evitar qualquer problema em outras partes do codigo

            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId
                    // O 'resultados' contém o insertId entre outros

                    return { ...atendimento, id}
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

        conexao.query(sql, id, async (erro, resultados) => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente
            
            if (erro) {
                response.status(400).json(erro)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data

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