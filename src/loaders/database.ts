import sequelize from "../config/database/sequelize"; // Sequelize ORM connection
import pool from "../config/database/db"; // MySQL2 raw connection

export async function syncedDB() {
  try {
    // await sequelize.sync();
    // await sequelize.sync({ force: true }); // force: true will drop the table if it exists and recreate it
    await sequelize.sync({ alter: true });
    console.log("Database & tables have been created!".cyan);
  } catch (error) {
    console.error("Error syncing the database:", error);
    process.exit(1);
  }
}

export default async function checkDatabaseConnections() {
  try {
    // Test Sequelize ORM connection
    await sequelize.authenticate();
    console.log("ORM DB connected".blue);

    // Test raw MySQL2 connection
    // const connection = await pool.getConnection();
    // try {
    //   console.log("Raw SQL DB connected");
    // } finally {
    //   connection.release();
    // }
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1); // Here am exiting the app if DB is not reachable
  }
}
