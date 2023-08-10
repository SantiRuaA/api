const { DataTypes } = require("sequelize");
const db = require("../db/database");

const ListaPaquete = db.define('listaPaquetes', {
    idLista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idPaquete: {
        type: DataTypes.INTEGER,
    },
});

module.exports = ListaPaquete;