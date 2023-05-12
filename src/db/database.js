const { Sequelize } = require("sequelize");

const db = new Sequelize('usuariosdb', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    /* one of | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  module.exports = db;