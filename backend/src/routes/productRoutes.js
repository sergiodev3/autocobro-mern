import { Router } from 'express';
const router = Router();
import { createProduct, getProducts, getProductPriceByBarcode, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import upload from '../middlewares/upload.js';

// Rutas con upload de archivos
router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);

// Rutas sin upload
router.get('/', getProducts);
// Verificador de precios por barcode
router.get('/price/:barcode', getProductPriceByBarcode);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);

export default router;
