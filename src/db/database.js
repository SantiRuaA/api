const { Sequelize } = require("sequelize");

const db = new Sequelize('baurarptfwoixloaogzv', 'ukvlyeczouzao4bo', 'HUZ8nQbXeVVQTOHP31pK', {
  host: 'baurarptfwoixloaogzv-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

module.exports = db;
