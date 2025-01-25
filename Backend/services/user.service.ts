
import { User, UserSchemaType } from '../models/user.model';
import { Request } from "express";


 
 /**
  * Create a new user
  * @param data 
  * @returns 
  */
 const createUser = async(data: { name: string; email: string; DOB: Date }): Promise<UserSchemaType> => {
  const user = new User(data);
  return await user.save();
}

/**
  * Get all users
  * @returns 
  */
 const getAllUsers = async(): Promise<UserSchemaType[]>  => {
  return await User.find();
}


/**
 * Get a user by ID
 * @param userId 
 * @returns 
 */
 const getUserById = async(userId: string): Promise<UserSchemaType | null>  =>{
  return await User.findById(userId);
}


/**
 * Update a user by ID
 * @param userId 
 * @param updates 
 * @returns 
 */
 const updateUser = async (userId: string, updates: Partial<UserSchemaType>): Promise<UserSchemaType | null> => {
  return await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
}


/**
 * Delete a user by ID
 * @param userId 
 * @returns 
 */
 const deleteUser = async (userId: string): Promise<UserSchemaType | null> => {
  return await User.findByIdAndDelete(userId);
}

export const userService = { createUser, getAllUsers, getUserById, updateUser, deleteUser };