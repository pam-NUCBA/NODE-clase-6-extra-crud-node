const http = require('http')
const products = require('./data/products.json')

const PORT = process.env.PORT || 8080

const server = http.createServer((req, res) => {
  //*con esto puedo elegir la ruta a la que va a entrar
  if(req.url === '/api/products' && req.method === 'GET') {
    res.writeHead(200, {'Content-type': 'application/json'})
    res.end(JSON.stringify(products))
  } else {
    //* para evitar que se cuelgue
    res.writeHead(404, {'Content-type': 'application/json'})
    res.end(JSON.stringify({'message': 'hubo un error'}))
  }
})

server.listen(PORT, () => `server on port ${PORT}`)