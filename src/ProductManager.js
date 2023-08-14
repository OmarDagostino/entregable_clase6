// llamada al sistema de archivos

import * as fs from 'fs';


/****************************************************************************************
 * creacion de la clase Product Manager                                                 *
 * **************************************************************************************/

class ProductManager {
    constructor(filePath) {
        this.products = []; 
        this.path = filePath; 
        
    }

// Método para cargar los productos 

async loadProducts(filePath) {
    try {
            if (fs.existsSync(filePath)) {
                const data = await fs.promises.readFile(filePath, 'utf-8');
                this.products = JSON.parse(data);
                return this.products;
            } else {
                console.log(`El archivo no existe en el path ${filePath}`);
            }
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

// creación del Método getProducts

    getProducts() {
        return this.products;
    }

// creación del Método getProductsById 

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error(`La ID "${id}" no pudo ser encontrada`);
            return;
        }
    }

}

/****************************************************************************************
 * Final de la clase Product Manager                                                    *
 * **************************************************************************************/

export default ProductManager;