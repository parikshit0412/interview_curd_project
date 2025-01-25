import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { productService } from '../services/product.service';
import mongoose from 'mongoose';


  // Create a new user
  export const createUser = async(req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.createUser(req.body);
      const {productId} = req.body;
      const userId = new mongoose.Types.ObjectId(user._id as string);
      await productService.updateProduct(productId, {userId : userId, purchaseDate: new Date()});
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all users
  export const getAllUsers = async(req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a user by ID
  const getUserById = async(req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update a user by ID
  const updateUser = async(req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      const {productId} = req.body;
      const userId = new mongoose.Types.ObjectId(user._id as string);
      await productService.updateProduct(productId, {userId : userId, purchaseDate: new Date()});
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a user by ID
  const deleteUser = async(req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


export const userController = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
