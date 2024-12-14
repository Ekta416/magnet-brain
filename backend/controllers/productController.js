const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};


const createProduct= async (req, res) => {
    const { name, price } = req.body;
  
    try {
      const product = new Product({ name, price });
      await product.save();
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  }
  module.exports = { getProducts,createProduct };
