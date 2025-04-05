import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
    console.log('DB_NAME:', process.env.DB_NAME);
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 3306,
        });

        console.log('Connected to MySQL database');
        await connection.end();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

testConnection();