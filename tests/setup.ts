import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

// Set up test database
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME_TEST || 'test_db',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
});

// Global test setup
beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('Test database connected');
  } catch (error) {
    console.error('Unable to connect to test database:', error);
  }
});

afterAll(async () => {
  await sequelize.close();
});
