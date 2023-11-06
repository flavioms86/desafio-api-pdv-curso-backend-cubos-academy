const fs = require('fs/promises')
const handlebars = require('handlebars')

const compilationHtml = async (arquivo, contexto) => {
    const html = await fs.readFile(arquivo)
    const compilation = handlebars.compile(html.toString())
    const htmlString = compilador(contexto)
    return htmlString
}

module.exports = compilationHtml