import { Product, ProductSchemaType } from "../models/product.model";
import fs from "fs";
import path from "path";
import { UserSchemaType } from "../models/user.model";

/**
 * Create a new product
 * @param data
 * @returns
 */
export const createProduct = async (data: {
  name: string;
  picture?: string;
  cost: number;
  userId?: string;
  purchaseDate?: Date;
}): Promise<ProductSchemaType> => {
  const product = new Product(data);
  return await product.save();
};

/**
 * 
 * @param skip 
 * @param limit 
 * @param userName 
 * @param productName 
 * @param fromDate 
 * @param toDate 
 * @returns 
 */
export const getAllProducts = async (skip : number, limit : number, userName: string, productName: string, fromDate : string, toDate : string): Promise<{products : ProductSchemaType[] , productsCount : number}> => {
  
  const matchStage : any= {}
  if(productName !==''){
    matchStage.name = { $regex: productName, $options: 'i' };
  }
  if(fromDate !=='' && toDate !==''){
    matchStage.purchaseDate = { $gte: new Date(fromDate), $lte: new Date(toDate) };
  
  }
  const skipStage = { $skip: skip};
  const limitStage = { $limit:limit };
  let products = await Product.aggregate([
    {$match: matchStage},
    {$lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' }},
    {$unwind: { path: '$user', preserveNullAndEmptyArrays: true }},
    ...(userName
      ? [
          {
            $match: {
              'user.name': { $regex: new RegExp(userName as string, 'i') }, // Proper regex creation
            },
          },
        ]
      : []),
      // Projection stage to include only required fields
      {
        $project: {
          name: 1,
          picture: 1,
          cost: 1,
          purchaseDate: 1,
          userName: '$user.name', // Alias for user name
        },
      },

      //Pagination: Skip and LImit
      skipStage,
      limitStage,

  ])
  let productsCount = await Product.countDocuments(matchStage);
  console.log('productCount', productsCount);
  return {products, productsCount};
};

/**
 * Get a product by ID
 * @param productId
 * @returns
 */
export const getProductById = async (
  productId: string
): Promise<ProductSchemaType | null> => {
  return await Product.findById(productId);
};

/**
 * Update a product by ID
 * @param productId
 * @param updates
 * @returns
 */
export const updateProduct = async (
  productId: string,
  updates: Partial<ProductSchemaType | UserSchemaType>
): Promise<ProductSchemaType | null> => {
  return await Product.findByIdAndUpdate(productId, updates, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete a product by ID
 * @param productId
 * @returns
 */
const deleteProduct = async (
  productId: string
): Promise<ProductSchemaType | null> => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Check if product has a picture and remove it from the uploads folder
    if (product.picture) {
      const filePath = path.join(
        __dirname + "/Backend",
        "../../",
        product.picture
      );
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Remove the file
      }
    }

    // Remove the product from the database
    return await Product.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUnsoldProducts = async (): Promise<ProductSchemaType[]> => {
  return await Product.find({ userId: { $in: [null, undefined] } });
}

export const productService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getUnsoldProducts
};
