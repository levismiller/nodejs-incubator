import { getDb } from '../database/mongo-client.cjs';

export async function logout(id) {
  const db = await getDb();
  return false;
}

export async function login(username, password) {
  const db = await getDb();




  return false;
}
