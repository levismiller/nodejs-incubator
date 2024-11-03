import { randomBytes } from 'crypto';

export async function createDatabaseId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return randomChars(chars, 16);
}

// called at application init outside of async
export async function createBaseSecret() {
  const chars = 'abcdef0123456789';
  return randomChars(chars, 64);
}

// called at application init outside of async
export function createSiteId() {

}

export async function generateTempPass() {
  const chars = '!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  return randomChars(chars, 8);
}

export async function randomChars(chars, len) {
  const randomArray = new Array(len);
  const charLength = chars.length;
  const randomValues = randomBytes(len);
  
  for (let i = 0; i < len; i++) {
    randomArray[i] = chars.charAt(randomValues[i] % charLength);
  }
  return randomArray.join('');
}