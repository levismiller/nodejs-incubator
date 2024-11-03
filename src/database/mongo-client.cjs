const { MongoClient } = require('mongodb');

const host = process.env.MONGO_DB_HOST;
const port = process.env.MONGO_DB_PORT;
const dbName = process.env.MONGODB_DB_NAME;
const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;

if (!host || !port || !dbName || !username || !password) {
  throw new Error("Missing one or more required environment variables for MongoDB connection.");
}

const uri = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
const client = new MongoClient(uri, { maxPoolSize: 10, minPoolSize: 5 });

let db;

async function connectDB() {
  if (!db) {
    try {
      await client.connect();
      db = client.db(dbName);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }
  return db;
}

async function getDb() {
  if (!db) {
    await connectDB();
  }
  return db;
}

module.exports = { 
  connectDB, 
  getDb 
};