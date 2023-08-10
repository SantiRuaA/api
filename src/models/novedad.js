const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Novedad = db.define('novedad', {
    idNovedad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcionNovedad: {
        type: DataTypes.STRING,
    },
    idTipoNovedad: {
        type: DataTypes.INTEGER,
    },
    idEntrega: {
        type: DataTypes.INTEGER,
    }
});

module.exports = Novedad;