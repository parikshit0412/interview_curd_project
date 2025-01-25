import { Request, Response } from 'express';
import { productService } from '../services/product.service';


  // Create a new product
  const createProduct = async(req: Request, res: Response): Promise<void> =>{
    try {
        const { name, cost, userId, purchaseDate } = req.body;
        let picture = '';
  
        if (req.file) {
          picture = req.file.path; // Save the file path from the upload
        }
  
        const product = await productService.createProduct({ name, picture, cost, userId, purchaseDate });
        res.status(201).json(product);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
  }

  // Get all products
  const getAllProducts = async(req: Request, res: Response): Promise<void>  =>{
    try {
      const page = parseInt(req.query.page as string, 10) || 1; // Default page 1
      const limit = 2; // Default 10 items per page
      const skip = (page - 1) * limit; // Calculate number of items to skip
      console.log(req.body)
      const {userName, productName, fromDate, toDate} = req.body;
      const returnData = await productService.getAllProducts(skip, limit, userName, productName, fromDate, toDate);

      res.status(200).json({ products :  returnData.products, pagination: { totalCount : returnData.productsCount, currentPage :  page, totalPage : Math.ceil(returnData.productsCount / limit) } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a product by ID
  const getProductById = async(req: Request, res: Response): Promise<void>  =>{
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a product by ID
 const updateProduct = async(req: Request, res: Response): Promise<void> => {
    try {
        const { name, cost, userId, purchaseDate } = req.body;
        let updates: any = { name, cost, userId, purchaseDate };
  
        if (req.file) {
          updates.picture = req.file.path; // Update the picture if a new file is uploaded
        }
  
        const product = await productService.updateProduct(req.params.id, updates);
        if (!product) {
          res.status(404).json({ message: 'Product not found' });
          return;
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
  }

  // Delete a product by ID
  const  deleteProduct = async(req: Request, res: Response): Promise<void> => {
    try {
      const product = await productService.deleteProduct(req.params.id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  const getUnsoldProducts = async(req: Request, res: Response): Promise<void> => {
    try {
      const products = await productService.getUnsoldProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


export const productController = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getUnsoldProducts };
