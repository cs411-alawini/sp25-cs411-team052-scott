import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error('Environment variables not set. Please check your .env file.');
  process.exit(1);
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function testConnection() {
  try {
    const [rows] = await pool.execute('SELECT 1');
    console.log('Connected to MySQL database');
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
}

testConnection();

export default pool;

