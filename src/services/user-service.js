import { getDb } from '../database/mongo-client.cjs';

export async function getById(id) {
  const db = await getDb();

  return await db.collection('users').findOne({ _id: id });
}


export async function create(username, password) {
  // // Registering a user
  // const password = 'userPassword123';
  // const { salt, hash } = hashPassword(password);

  // // Store `salt` and `hash` in the database

  // // Logging in a user
  // const isPasswordValid = verifyPassword('userPassword123', salt, hash);
  // if (isPasswordValid) {
  //   console.log('Password is correct');
  // } else {
  //   console.log('Password is incorrect');
  // }
}