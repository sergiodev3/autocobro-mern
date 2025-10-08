import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    if (req.file) {
      productData.image = `/uploads/products/${req.file.filename}`;
    }
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    if (req.file) {
      const filePath = path.join(process.cwd(), 'uploads/products', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(400).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    if (req.file) {
      const currentProduct = await Product.findById(req.params.id);
      if (currentProduct && currentProduct.image && !currentProduct.image.includes('data:')) {
        const oldImagePath = path.join(process.cwd(), currentProduct.image.replace(/^\//, ''));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      productData.image = `/uploads/products/${req.file.filename}`;
    }
    
    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    if (req.file) {
      const filePath = path.join(process.cwd(), 'uploads/products', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(400).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    
    if (product.image && !product.image.includes('data:')) {
      const imagePath = path.join(process.cwd(), product.image.replace(/^\//, ''));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductPriceByBarcode = async (req, res) => {
  try {
    const { barcode } = req.params;
    const product = await Product.findOne({ barcode }, 'name price image');
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};