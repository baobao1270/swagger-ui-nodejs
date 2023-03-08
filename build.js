const fs = require('fs')

const TITLE = process.env.TITLE || 'Swagger UI'
const DOCUMENT_ROOT_URL = process.env.DOCUMENT_ROOT_URL || 'https://petstore.swagger.io/v2/swagger.json'

const styles = ["swagger-ui.css", "index.css"]
const scripts = ["swagger-ui-bundle.js", "swagger-ui-standalone-preset.js", "swagger-initializer.js"]
const stylesContent = []
let scriptsContent = []

scriptsContent.push(`const DOCUMENT_ROOT_URL = '${DOCUMENT_ROOT_URL}'`)
styles.forEach(file => {
    stylesContent.push(fs.readFileSync(`src/${file}`, 'utf8'))
})
scripts.forEach(file => {
    scriptsContent.push(fs.readFileSync(`src/${file}`, 'utf8'))
})

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/png" href="favicon.png"/>
    <title>${TITLE}</title>
    ${stylesContent.map(style => `<style>${style}</style>`).join('\n')}
  </head>
  <body>
    <div id="swagger-ui"></div>
  </body>
  ${scriptsContent.map(script => `<script>${script}</script>`).join('\n')}
</html>
`

if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true })
}
fs.mkdirSync('dist')
fs.writeFileSync('dist/index.html', html)
fs.copyFileSync('src/favicon.png', 'dist/favicon.png')
fs.copyFileSync('src/favicon.ico', 'dist/favicon.ico')
