import { getById, create } from '../services/user-service.js';
import { validateUserId, validateCreateUser } from '../validation/user-validation.js';
import { generateTempPass } from '../lib/utils.js';
import { hashPassword } from '../lib/auth.js';


const controller = {
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await getById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const validationErrors = validateCreateUser(req.body);

            if (validationErrors) {
                return res.status(400).json({ message: 'Could not create user', errors: validationErrors });
            }

            const tempPassword = await generateTempPass();
            const { username } = req.body;
            const newUser = await create(username, tempPassword);

            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    }
}

export default controller;

// // Retrieve all users
// async function getAllUsers(req, res) {
//     try {
//         const users = await _getAllUsers();
//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ message: 'An error occurred', error: error.message });
//     }
// }

// // Update an existing user by ID
// async function updateUser(req, res) {
//     try {
//         const userId = req.params.id;
//         const updatedUser = await _updateUser(userId, req.body);

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ message: 'An error occurred', error: error.message });
//     }
// }

// // Delete a user by ID
// async function deleteUser(req, res) {
//     try {
//         const userId = req.params.id;
//         const result = await _deleteUser(userId);

//         if (!result) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(204).send(); // No Content
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ message: 'An error occurred', error: error.message });
//     }
// }

