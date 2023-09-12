const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async addProduct(product) {
        try {
            const products = await this.getProductsFromFile();
            const newProductId = products.length + 1; // Autoincremental ID
            const newProduct = {
                id: newProductId,
                ...product,
            };
            products.push(newProduct);
            await this.saveProductsToFile(products);
            return newProduct;
        } catch (error) {
            throw new Error(`Error adding product: ${error.message}`);
        }
    }

    async getProducts() {
        try {
            const products = await this.getProductsFromFile();
            return products;
        } catch (error) {
            throw new Error(`Error getting products: ${error.message}`);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProductsFromFile();
            const product = products.find((p) => p.id === id);
            if (!product) {
                throw new Error(`Product with ID ${id} not found`);
            }
            return product;
        } catch (error) {
            throw new Error(`Error getting product by ID: ${error.message}`);
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const products = await this.getProductsFromFile();
            const index = products.findIndex((p) => p.id === id);
            if (index === -1) {
                throw new Error(`Product with ID ${id} not found`);
            }
            products[index] = { id, ...updatedProduct };
            await this.saveProductsToFile(products);
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProductsFromFile();
            const index = products.findIndex((p) => p.id === id);
            if (index === -1) {
                throw new Error(`Product with ID ${id} not found`);
            }
            products.splice(index, 1);
            await this.saveProductsToFile(products);
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }

    async getProductsFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            return JSON.parse(data) || [];
        } catch (error) {
            return [];
        }
    }

    async saveProductsToFile(products) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error(`Error saving products to file: ${error.message}`);
        }
    }
}


const productManager = new ProductManager('products.json');

productManager.addProduct({
    title: 'Limpiador Facial Suave',
    description: 'Un limpiador facial suave que elimina el maquillaje, la suciedad y el exceso de grasa sin resecar la piel. Ideal para todo tipo de piel.',
    price: 15.000,
    thumbnail: 'ruta_de_imagen.jpg',
    code: 'SKIN001',
    stock: 15,
})
    .then((newProduct) => {
        console.log('Producto agregado:', newProduct);
    })
    .catch((error) => {
        console.error(error);
    });
productManager.addProduct({
    title: 'Tónico Hidratante',
    description: 'Un tónico que restaura el equilibrio del pH de la piel y proporciona hidratación adicional. Ayuda a preparar la piel para otros productos.',
    price: 9.000,
    thumbnail: 'ruta_de_imagen.jpg',
    code: 'SKIN001',
    stock: 25,
})
    .then((newProduct) => {
        console.log('Producto agregado:', newProduct);
    })
    .catch((error) => {
        console.error(error);
    });
productManager.addProduct({
    title: 'Serum de Vitamina C',
    description: 'Un serum antioxidante que ilumina la piel, reduce las manchas oscuras y mejora la textura. Ideal para combatir los signos del envejecimiento.',
    price: 25.000,
    thumbnail: 'ruta_de_imagen.jpg',
    code: 'SKIN001',
    stock: 28,
})
    .then((newProduct) => {
        console.log('Producto agregado:', newProduct);
    })
    .catch((error) => {
        console.error(error);
    });
productManager.addProduct({
    title: 'Crema Hidratante con SPF',
    description: 'Una crema hidratante que también ofrece protección solar (SPF 30 o superior). Protege la piel de los daños causados por los rayos UV.',
    price: 35.000,
    thumbnail: 'ruta_de_imagen.jpg',
    code: 'SKIN001',
    stock: 100,
})
    .then((newProduct) => {
        console.log('Producto agregado:', newProduct);
    })
    .catch((error) => {
        console.error(error);
    });
productManager.addProduct({
    title: 'Aceite Facial de Rosa Mosqueta',
    description: 'Un aceite ligero que hidrata y regenera la piel. Puede ayudar a reducir cicatrices y mejorar la elasticidad.',
    price: 20.000,
    thumbnail: 'ruta_de_imagen.jpg',
    code: 'SKIN001',
    stock: 10,
})
    .then((newProduct) => {
        console.log('Producto agregado:', newProduct);
    })
    .catch((error) => {
        console.error(error);
    });
productManager.addProduct({
    title: 'Mascarilla Exfoliante',
    description: 'Una mascarilla que contiene ácidos suaves para exfoliar la piel y eliminar las células muertas. Deja la piel suave y radiante.',
    price: 10.000,
    thumbnail: 'ruta_de_imagen.jpg',
    code: 'SKIN001',
    stock: 15,
})
    .then((newProduct) => {
        console.log('Producto agregado:', newProduct);
    })
    .catch((error) => {
        console.error(error);
    });
productManager.addProduct({
    title: 'Crema de Noche Regeneradora',
    description: 'Una crema rica que nutre la piel mientras duermes. Ayuda a reparar y revitalizar la piel durante la noche.',
    price: 35.000,
    thumbnail: 'ruta_de_imagen.jpg',
    code: 'SKIN001',
    stock: 20,
})
    .then((newProduct) => {
        console.log('Producto agregado:', newProduct);
    })
    .catch((error) => {
        console.error(error);
    });
