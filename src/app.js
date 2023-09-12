const express = require('express');
const app = express();
const ProductManager = require('./ProductManager ');    

const PORT = process.env.PORT || 3000;
const productManager = new ProductManager('products.json'); 

app.use(express.json());

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getProducts();
    const limitedProducts = limit ? products.slice(0, limit) : products;

    res.json({ products: limitedProducts });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json({ product });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
