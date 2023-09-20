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
