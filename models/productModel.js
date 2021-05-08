//*va a ser let porque va a ser redefinido en el delete:
let products = require("../data/products.json");
const { v4: uuidv4 } = require("uuid");
const { writeData } = require("../utils");

const findAllProducts = () => {
  //*retorno una promesa porque devuelvo data:
  return new Promise((resolve, reject) => {
    resolve(products);
    // reject(console.log("whoops"));
  });
};

const findOneById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find((item) => item.id === id);
    resolve(product);
    // reject(console.log("whoops"));
  });
};

//*vamos a necesitar pasar el producto
const createItem = (product) => {
  return new Promise((resolve, reject) => {
    //*vamos a necesitar pasar el product, y el id va a ser generado automáticamente con el uuid
    const newProduct = { id: uuidv4(), ...product };
    //*ya products lo teníamos, ahora, igual que en el CRUD CLI, vamos a tener que hacerle un push
    products.push(newProduct);
    //*con esto el escribir lo hacemos un poco más reutilizable:
    writeData("./data/products.json", products);
    //*resolvemos la promesa:
    resolve(newProduct);
  });
};

//*para hacer el update:
const updateItem = (id, product) => {
  return new Promise((resolve, reject) => {
    //*busco el index del que quiero modificar:
    const index = products.findIndex((prod) => prod.id === id);
    //*voy a tomar el index y modificarlo con lo que viene desde el product
    products[index] = { id, ...product };
    writeData("./data/products.json", products);
    //*en el resolve solo quiero resolver ese index en particular
    resolve(products[index]);
  });
};

//*delete:
const removeOne = (id) => {
  return new Promise((resolve, reject) => {
    //*hago el filter para que solo quede lo que no tenga el id que le estoy pasando
    products = products.filter((prod) => prod.id !== id);
    writeData("./data/products.json", products);
    resolve();
  });
};

module.exports = {
  findAllProducts,
  findOneById,
  createItem,
  updateItem,
  removeOne,
};
