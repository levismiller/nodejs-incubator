import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import { connectDB } from './database/mongo-client.cjs';
import userRoutes from './routes/user-routes.js';
import authRoutes from './routes/auth-routes.js';
import { setJwtConfig } from './lib/auth.js';
import { createBaseSecret } from './lib/utils.js';

const baseSecret = await createBaseSecret();
const secret = Buffer.from(baseSecret, "hex");
const expires = '5m';
const encryption = "A256GCM";
const wrap = "dir";

setJwtConfig(secret, expires, wrap, encryption);

const app = express();
const PORT = process.env.APP_PORT;

app.use(json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

async function startServer() {
  try {
    // this could be removed to allow container start up
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();