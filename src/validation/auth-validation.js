
export function validateLoginCredentials({ username, password }) {
  const errors = {};

  if (!username || typeof username !== 'string') {
    errors.username = 'Username is required';
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.password = 'Password is required';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}