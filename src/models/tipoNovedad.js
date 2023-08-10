const { DataTypes } = require("sequelize");
const db = require("../db/database");

const TipoNovedad = db.define('tiponovedad', {
    idTipoNovedad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
    },
    tipoNovedad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = TipoNovedad;