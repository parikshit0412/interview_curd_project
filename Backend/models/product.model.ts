// Define the TypeScript interface for a Product
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ProductSchemaType extends Document {
    name: string;
    picture?: string;
    cost: number;
    createdAt: Date;
    updatedAt: Date;
    userId?: mongoose.Types.ObjectId;
    purchaseDate?: Date;
  }
  
  // Define the Product schema
  const ProductSchema: Schema = new Schema<ProductSchemaType>(
    {
      name: { type: String, required: true, minlength: [2, "name should be at least 2 letter"] },
      picture: { type: String },
      cost: { type: Number, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },
      purchaseDate: { type: Date, required: false , default: null},  
    },
    { timestamps: true },
  );
  
  // Create the Product model
  export const Product: Model<ProductSchemaType> = mongoose.model<ProductSchemaType>('Product', ProductSchema);
  