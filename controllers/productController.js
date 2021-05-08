const Product = require("../models/productModel");
//*traer esto cuando cree el util para la data en post:
const { getPostData } = require("../utils");

//GET ALL
//*mostrar las dos formas de hacerlo async:
// async function getProducts(req, res) {
const getProducts = async (req, res) => {
  try {
    //*debo traer el products primero:
    const products = await Product.findAllProducts();

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};

//GET ONE
const getProduct = async (req, res, id) => {
  try {
    const product = await Product.findOneById(id);

    if (!product) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(product)); //* cuidado, recordar que estamos pasando uno solo!
    }
  } catch (error) {
    console.log(error);
  }
};

//ADD ONE
//*en el estático esta va ser async, en el dinámico ese async se mueve al end, luego se vuelve a sacar cuando haga el util
const addProduct = async (req, res) => {
  try {
    //*descomentar cuando hagamos el estático:
    //*primero vamos a hacer un estático:
    //*el id va a generarse
    // const product =  {
    //   name: "algo estático",
    //   info: "lorem ipsum",
    //   price: 5282
    // }

    //*el siguiente paso va a ser hacerlo de forma dinámica
    //* esto se va a comentar cuando cree el util:
    // let body = "";
    // req.on("data", (chunk) => {
    //   body += chunk.toString();
    // });

    // req.on("end", async () => {

    //*destructuro lo que viene
    //*esto se va a comentar cuando lo mueva al util:
    // const { name, info, price } = JSON.parse(body);

    //   const product = {
    //     name,
    //     info,
    //     price,
    //   };

    //   const newProduct = await Product.createItem(product);

    //   res.writeHead(201, { "Content-type": "application/json" });
    //   return res.end(JSON.stringify(newProduct));
    // });

    //*esto es para el estático, para el dinámico se va a mover dentro del try
    // const newProduct = await Product.createItem(product)

    // res.writeHead(201, {"Content-type": "application/json" })
    // return res.end(JSON.stringify(newProduct))

    //*todo lo anterior se va a comentar y traer desde el util:

    const body = await getPostData(req);

    const { name, info, price } = JSON.parse(body);

    const product = {
      name,
      info,
      price,
    };

    const newProduct = await Product.createItem(product);

    res.writeHead(201, { "Content-type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
};

//UPDATE ONE
const updateProduct = async (req, res, id) => {
  //*copiamos la estructura del create, le agregamos id entre los param que pasamos
  try {
    //*lo que agregamos es primero encontrar el producto
    const product = await Product.findOneById(id);

    if (!product) {
      //* lo copio del getProduct
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      const body = await getPostData(req);

      const { name, info, price } = JSON.parse(body);

      //*ahora va a ser igual a lo que pasemos nuevo, o a lo que ya estaba, si no se pasa nada
      const updatedProductData = {
        name: name || product.name,
        info: info || product.info,
        price: price || product.price,
      };

      //*el update va a venir del modelo
      const updatedProduct = await Product.updateItem(id, updatedProductData);

      res.writeHead(200, { "Content-type": "application/json" });
      return res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
};

//DELETE ONE:
const deleteProduct = async (req, res, id) => {
  try {
    const product = await Product.findOneById(id);

    if (!product) {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      await Product.removeOne(id);
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: `product ${id} deleted` }));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
