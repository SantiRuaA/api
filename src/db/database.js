const { Sequelize } = require("sequelize");

const db = new Sequelize('starrouting', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  /* one of | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */

  define: {
    freezeTableName: true, // Evita la pluralización de nombres de tablas
    timestamps: false, // Si no utilizas timestamps en tus modelos
  },
});

module.exports = db;