const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Entrega = db.define('entrega', {
    idEntrega: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firmaDestinatario: {
        type: DataTypes.BLOB,
    },
    fechaEntrega: {
        type: DataTypes.DATE,
    },
    idLista: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Entrega;