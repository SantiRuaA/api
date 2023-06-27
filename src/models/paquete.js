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
    idUsuario: {
        type: DataTypes.INTEGER,
    },
    documentoRemitente: {
        type: DataTypes.INTEGER,
    },
    documentoDestinatario: {
        type: DataTypes.INTEGER,
    },
    idEstado: {
        type: DataTypes.INTEGER,
    },
    idTamano: {
        type: DataTypes.INTEGER,
    },
});
//Paquete.hasOne(TipoDocumentoUsuario, { foreignKey: 'idTipoDocumentoUsuario'});
module.exports = Paquete;