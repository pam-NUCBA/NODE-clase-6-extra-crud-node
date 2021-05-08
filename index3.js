const http = require('http')
const {getProducts, getProduct} = require('./controllers/productController')

const PORT = process.env.PORT || 8080

const server = http.createServer((req, res) => {
  //*con esto puedo elegir la ruta a la que va a entrar
  if(req.url === '/api/products' && req.method === 'GET') {
    //*ya no necesito pasar el writeHead ni el end porque req y res vienen desde el create server de la línea 6, pero pasan por el
    getProducts(req, res)
    //*podemos buscar por id usando una regexp
  } else if(req.url.match(/\/api\/products\/([0-9+])/) && req.method === 'GET') {
    //*acá estamos haciendo lo mismo que se hizo con el param en consola, un split para tomar lo que venga después de algo, y elijo el 3er parámetro, lo que va a venir después de la url
    const id = req.url.split('/')[3]
    getProduct(req, res, id)
  } else {
    //* para evitar que se cuelgue
    res.writeHead(404, {'Content-type': 'application/json'})
    res.end(JSON.stringify({'message': 'hubo un error'}))
  }
})

server.listen(PORT, () => `server on port ${PORT}`)