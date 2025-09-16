"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncedDB = syncedDB;
exports.default = checkDatabaseConnections;
const sequelize_1 = __importDefault(require("../config/database/sequelize")); // Sequelize ORM connection
async function syncedDB() {
    try {
        // await sequelize.sync();
        await sequelize_1.default.sync({ force: true }); // force: true will drop the table if it exists and recreate it
        // await sequelize.sync({ alter: true });
        console.log("Database & tables have been created!".cyan);
    }
    catch (error) {
        console.error("Error syncing the database:", error);
        process.exit(1);
    }
}
async function checkDatabaseConnections() {
    try {
        // Test Sequelize ORM connection
        await sequelize_1.default.authenticate();
        console.log("ORM DB connected".blue);
        // Test raw MySQL2 connection
        // const connection = await pool.getConnection();
        // try {
        //   console.log("Raw SQL DB connected");
        // } finally {
        //   connection.release();
        // }
    }
    catch (err) {
        console.error("DB connection failed:", err);
        process.exit(1); // Here am exiting the app if DB is not reachable
    }
}
