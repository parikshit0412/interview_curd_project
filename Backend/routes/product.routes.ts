import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { uploadMiddleware } from '../middleware/uploadImage';

const router = Router();

router.post('/add-product', uploadMiddleware, productController.createProduct); // Create a new product with image upload
router.post('/get-products', productController.getAllProducts); // Get all products
router.get('/get-products/:id', productController.getProductById); // Get a product by ID
router.put('/update-product/:id', uploadMiddleware, productController.updateProduct); // Update a product with optional image upload
router.delete('/delete-product/:id', productController.deleteProduct); // Delete a product by ID
router.get('/get-unsold-products', productController.getUnsoldProducts); // Get all unsold products

export default router;
