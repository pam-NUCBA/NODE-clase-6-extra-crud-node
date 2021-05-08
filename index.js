const http = require("http");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([a-z0-9-]+)/) &&
    req.method === "GET"
  ) {
    //*con esto consigo el id, al separar en términos
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
    //*lo siguiente va a ser pasar objetos desde el postman!
  } else if (req.url === "/api/products" && req.method === "POST") {
    addProduct(req, res);
    //*put requests:
  } else if (
    req.url.match(/\/api\/products\/([a-z0-9-]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
    //*para probarlo: pasar el id con /id, y método put
    //*remove:
  } else if (
    req.url.match(/\/api\/products\/([a-z0-9-]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "hubo un error" }));
  }
});

server.listen(PORT, () => `server on port ${PORT}`);
