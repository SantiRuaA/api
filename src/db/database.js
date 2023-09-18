const { Sequelize } = require("sequelize");

const db = new Sequelize('baurarptfwoixloaogzv', 'ukvlyeczouzao4bo', 'HUZ8nQbXeVVQTOHP31pK', {
  DB_HOST: 'baurarptfwoixloaogzv-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  /* one of | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */

  define: {
    freezeTableName: true, // Evita la pluralización de nombres de tablas
    timestamps: false, // Si no utilizas timestamps en tus modelos
  },
});

module.exports = db;