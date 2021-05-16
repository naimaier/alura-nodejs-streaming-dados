const fs = require('fs')

fs.readFile('./assets/cachorro.jpeg', (erro, buffer) => {
    console.log('Imagem no buffer')

    fs.writeFile('./assets/cachorro2.jpg', buffer, (erro) => {
        console.log('Imagem escrita')
    })
})

// Se a imagem for grande o callback pode demorar a ser chamado.
// Como essa é uma função síncrona ela vai travar a execução do programa