const { DataTypes } = require("sequelize");
const db = require("../db/database");
const TipoDocumentoCliente = require("./tipoDocumentoCliente");

const Cliente = db.define('cliente', {
    idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    documentoCliente: {
        type: DataTypes.INTEGER,
    },
    idTipoDocumento: {
        type: DataTypes.INTEGER,
    },
    nombreCliente: {
        type: DataTypes.STRING,
    },
    telefonoCliente: {
        type: DataTypes.STRING,
    },
    correoCliente: {
        type: DataTypes.STRING,
    },
    direccionCliente: {
        type: DataTypes.STRING,
    },
});
//Cliente.hasOne(TipoDocumentoCliente, { foreignKey: 'idTipoDocumentoCliente'});
module.exports = Cliente;