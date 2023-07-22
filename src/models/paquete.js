const { DataTypes } = require("sequelize");
const db = require("../db/database");
const Usuario = require("./Usuario");
const Cliente = require("./cliente");
const EstadoPaquete = require("./estadoPaquete");
const TamanoPaquete = require("./tamanoPaquete");

const Paquete = db.define('paquete', {
    idPaquete: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigoQrPaquete: {
        type: DataTypes.STRING,
    },
    pesoPaquete: {
        type: DataTypes.DECIMAL(10, 2)
    },
    contenidoPaquete: {
        type: DataTypes.STRING,
    },
    documentoDestinatario: {
        type: DataTypes.INTEGER,
    },
    nombreDestinatario: {
        type: DataTypes.STRING,
    },
    correoDestinatario: {
        type: DataTypes.STRING,
    },
    telefonoDestinatario: {
        type: DataTypes.STRING,
    },
    fechaAproxEntrega: {
        type: DataTypes.DATE,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
    },
    documentoRemitente: {
        type: DataTypes.INTEGER,
    },
    idEstado: {
        type: DataTypes.INTEGER,
    },
    idTamano: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    idTipo: {
        type: DataTypes.INTEGER,
    },
});
//Paquete.hasOne(TipoDocumentoUsuario, { foreignKey: 'idTipoDocumentoUsuario'});
module.exports = Paquete;