const http = require('http')
const products = require('./products.json')

const PORT = process.env.PORT || 8080


//* req res son objetos a los que tengo acceso cada vez que llamo a http. 
//* res pueden ser headers o cosas que ponga en el body

//* mostrar cómo puedo crear todo en menos líneas, después separarlo en función de nuevo:
// http.createServer((req,res)=> {

// }).listen(PORT, () => ('ok')))

const server = http.createServer((req, res) => {
  //*ver cómo estos datos se ven en postman
  console.log('yay')
  // res.statusCode = 200
  // res.setHeader('Content-type', 'text/html')
  // res.write('<h1>Hola!</h1>')

  //*esos dos datos pueden pasarse en una sola línea:
  res.writeHead(200, {'Content-type': 'application/json'})
  res.end(JSON.stringify(products))
})

server.listen(PORT, () => `server on port ${PORT}`)