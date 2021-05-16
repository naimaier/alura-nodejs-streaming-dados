const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const extensao = path.extname(caminho)
    const novoCaminho = `./assets/imagens/${nomeDoArquivo}${extensao}`

    fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on('finish', () => callbackImagemCriada(novoCaminho))
}

// Como seu processamento é em paralelo, não teremos um callback
// A stream possui eventos