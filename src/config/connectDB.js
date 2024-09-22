const { Sequelize } = require("sequelize");

// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("hoang", "root", "hoang1505", {
  host: "localhost",
  port: "3307",
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    charset: "utf8mb4",
    connectTimeout: 60000, // Thời gian chờ kết nối (60 giây)
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = connectDB;
