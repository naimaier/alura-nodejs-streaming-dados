const fs = require('fs')

fs.createReadStream('./assets/cachorro.jpeg')
    .pipe(fs.createWriteStream('./assets/cachorro2.jpg'))
    .on('finish', () => console.log('Imagem escrita com sucesso!'))

// Como seu processamento é em paralelo, não teremos um callback
// A stream possui eventos