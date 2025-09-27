import { Router } from 'express';
const router = Router();
import { createProduct, getProducts, getProductPriceByBarcode, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';

router.post('/', createProduct);
router.get('/', getProducts);
// Verificador de precios por barcode
router.get('/price/:barcode', getProductPriceByBarcode);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
