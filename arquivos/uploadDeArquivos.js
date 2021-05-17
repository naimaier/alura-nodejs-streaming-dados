const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tiposValidos = ['jpg', 'jpeg', 'png']
    const extensao = path.extname(caminho)
    const tipoEhValido = tiposValidos.indexOf(extensao.substring(1)) !== -1
    // estamos removendo o ponto da extensao antes de comparar

    if (tipoEhValido) {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${extensao}`
    
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagemCriada(false, novoCaminho))
    } else {
        const erro = 'Tipo é inválido'
        console.log('Erro! Tipo inválido')
        callbackImagemCriada(erro)
    }
}

// Como seu processamento é em paralelo, não teremos um callback
// A stream possui eventos