const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async _readFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async _writeFile(data) {
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, 4));
    }

    async addProduct(product) {
        const data = await this._readFile();

        if (!data.length) {
            product.id = 1;
        } else {
            product.id = data[data.length - 1].id + 1;
        }

        data.push(product);
        await this._writeFile(data);
    }

    async getProducts() {
        return await this._readFile();
    }

    async getProductById(product_id) {
        const data = await this._readFile();
        return data.find(product => product.id === product_id) || null;
    }

    async updateProduct(product_id, updated_fields) {
        const data = await this._readFile();

        for (const product of data) {
            if (product.id === product_id) {
                for (const key in updated_fields) {
                    product[key] = updated_fields[key];
                }
            }
        }

        await this._writeFile(data);
    }

    async deleteProduct(product_id) {
        let data = await this._readFile();
        data = data.filter(product => product.id !== product_id);
        await this._writeFile(data);
    }
}
(async () => {
    const manager = new ProductManager('products.json');

    const newProduct = {
        title: 'Exfoliante corporal Acerola e hibisco,Nutrición prebiótica que se adapta a los cambios de tu piel acerola e hibisco',
        description: 'Esta es una descripción de ejemplo',
        price: 15.000,
        thumbnail: 'path/to/image.jpg',
        code: 'NATCHL-117687',
        stock: 50
    };

    await manager.addProduct(newProduct);

    const products = await manager.getProducts();
    console.log(products);

    const productToUpdate = await manager.getProductById(1);
    if (productToUpdate) {
        await manager.updateProduct(productToUpdate.id, { price: 24.99 });
    }

    const productToDelete = await manager.getProductById(1);
    if (productToDelete) {
        await manager.deleteProduct(productToDelete.id);
    }
})();
