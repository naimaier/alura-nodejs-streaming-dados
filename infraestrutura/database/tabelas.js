class Tabelas {
    init(conexao) {
        this.conexao = conexao
        
        this.criarAtendimentos()
        this.criarAnimais()
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
        
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela atendimentos criada com sucesso')
            }
        })
    }

    criarAnimais() {
        const sql = `CREATE TABLE IF NOT EXISTS Animais (id int NOT NULL AUTO_INCREMENT, 
            nome varchar(50), imagem varchar(200), PRIMARY KEY(id))`
        
        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela Animais criada com sucesso')
            }
        })
    }
    //Vamos salvar a imagem no servidor e guardar aqui o caminho dessa imagem
}

module.exports = new Tabelas
// Extamos exportando a classe já instanciada,
// não vamos ter várias instâncias de tabela