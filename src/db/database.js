const { Sequelize } = require("sequelize");

const db = new Sequelize("railway", "root", "7vqEknHKJuz6ang7krPN", {
  host: "containers-us-west-86.railway.app",
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

module.exports = db;
