const conexao = require('../infraestrutura/conexao')
const uploadDeArquivo = require('../arquivos/uploadDeArquivos')

class Animal {
    adiciona(animal, resposta) {
        const sql = `INSERT INTO Animais SET ?`

        uploadDeArquivo(animal.imagem, animal.nome, (novoCaminho) => {

            const novoAnimal = {nome: animal.nome, imagem: novoCaminho}

            conexao.query(sql, novoAnimal, (erro, resultados) => {
                if (erro) {
                    console.log(erro)
                    resposta.status(400).json(erro)
                } else {
                    resposta.status(201).json(novoAnimal)
                }
            })
        })

    }
}

module.exports = new Animal()