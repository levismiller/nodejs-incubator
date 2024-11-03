
export function validateUserId({ userId }) {
    const errors = {};
    if (!userId || typeof userId !== 'string') {
        errors.userId = 'User ID is required and must be a string';
    }
    return Object.keys(errors).length > 0 ? errors : null;
}

export function validateCreateUser({ username }) {
    const errors = {};
    if (!username || typeof username !== 'string') {
        errors.username = 'Username is required and must be a string';
    }
    return Object.keys(errors).length > 0 ? errors : null;
}