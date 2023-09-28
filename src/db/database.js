const { Sequelize } = require("sequelize");

const db = new Sequelize('ber3cpmjqgibm884dabq', 'ukmtsqlo5wlfwezj', 'Inl9PNimgsJcVTCQy00O', {
  host: 'ber3cpmjqgibm884dabq-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

module.exports = db;


/*const db = new Sequelize('starrouting', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  /* one of | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */

/*define: {
  freezeTableName: true, // Evita la pluralización de nombres de tablas
  timestamps: false, // Evita la creación de los campos createdAt y updatedAt
},
});*/