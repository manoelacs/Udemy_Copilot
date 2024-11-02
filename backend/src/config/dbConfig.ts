import * as dotenv from 'dotenv';
import * as mysql from 'mysql2/promise';

// Ensure environment variables are set
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME || !DB_PORT) {
  throw new Error(
    'Missing required environment variables for database configuration'
  );
}

// Define the database configuration object
const dbConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
};

// Create the connection pool using the configuration object
export const dbConfigPool = mysql.createPool(dbConfig);
