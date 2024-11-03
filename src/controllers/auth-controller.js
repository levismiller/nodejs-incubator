import { login, logout } from '../services/auth-service.js';
import { validateLoginCredentials } from '../validation/auth-validation.js';

const controller = {
    login: async (req, res) => {
        try {
            const validationErrors = validateLoginCredentials(req.body);
    
            if (validationErrors) {
                return res.status(400).json({ message: 'Login failed', errors: validationErrors });
            }
    
            const { username, password } = req.body;
    
    
            res.status(200).json({});
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    },
    
    logout: async (req, res) => {
        try {
            res.status(200);
        } catch (error) {
            console.error('Error logging out:', error);
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    }
}


export default controller;