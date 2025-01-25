import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

router.post('/add-user', userController.createUser); // Create a new user
router.get('/get-users', userController.getAllUsers); // Get all users
router.get('/get-users/:id', userController.getUserById); // Get a user by ID
router.put('/update-user/:id', userController.updateUser); // Update a user by ID
router.delete('/delete-user/:id', userController.deleteUser); // Delete a user by ID

export default router;