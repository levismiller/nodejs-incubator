'use strict'
import { EncryptJWT } from 'jose';
import { randomBytes, pbkdf2Sync } from 'crypto';

let secret;
let expires;
let encryption;
let wrap;

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const iterations = 100000;
  const keyLength = 64;
  const digest = 'sha512';
  const hash = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');
  return { salt, hash };
}

export function verifyPassword(password, salt, storedHash) {
  const iterations = 100000;
  const keyLength = 64;
  const digest = 'sha512';

  const hash = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');

  return hash === storedHash;
}

export async function getJwtConfig() {
  return {
    secret: secret,
    expires: expires,
    wrap: wrap,
    encryption: encryption
  }
}

export async function setJwtConfig(key, exp, dir, enc) {
  secret = key;
  expires = exp;
  wrap = dir;
  encryption = enc;
}

export async function getToken(user) {
  return await new EncryptJWT({ _id: user._id, roles: user.roles, email: user.email })
    .setProtectedHeader({ alg: wrap, enc: encryption })
    .setIssuedAt()
    .setExpirationTime(expires)
    .encrypt(secret);
}