import express from 'express';
import ProductManager from './ProductManager.js';

// se crea la instancia productManager de la clase ProductManager

const productManager = new ProductManager('./productos.json');

// se crea la funcion asincronica leerProductos 

async function leerProductos ()
{
const products = await productManager.loadProducts ('./productos.json')
}

// se llama a la funcion leer productos

leerProductos ()

// se crea el servidor express

const app = express();

app.use(express.urlencoded({ extended: true }));

// se crea el endpoint para manejar solicitudes de consultas de productos (total o especificas de un id)

app.get('/products/:pid', (req, res) => {
  const products = productManager.getProducts();
  const productId = parseInt(req.params.pid);

  if (productId > 0) {
    const foundProduct = products.find(producto => producto.id === productId);
    if (!foundProduct) {
      console.error(`La ID "${productId}" no pudo ser encontrada`);
      return res.status(404).send(`Producto con ID ${productId} no encontrado`);
    } else {
      return res.send(foundProduct);
    }
  } else {
    return res.send(products);
  }
});

// se crea un endpoint para manejar consultas de productos limitadas a un limite solicitado

app.get('/products/', (req, res) => {
  const products = productManager.getProducts();
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

  if (limit) {
    const primerosProductos = products.slice(0, limit);
    return res.send(primerosProductos);
  }

  return res.send(products);
});

// se levanta el puerto 8080 para escuchar solicitudes de los endpoints desarrollados

app.listen(8080, () => console.log('Preparado para recibir solicitudes en el puerto 8080'));

