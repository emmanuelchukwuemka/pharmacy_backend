"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_1 = require("sequelize");
// Set up test database
const sequelize = new sequelize_1.Sequelize({
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
    }
    catch (error) {
        console.error('Unable to connect to test database:', error);
    }
});
afterAll(async () => {
    await sequelize.close();
});
