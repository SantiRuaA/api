const { DataTypes } = require("sequelize");
const db = require("../db/database");
const Usuario = require("./Usuario");
const Cliente = require("./cliente");
const EstadoPaquete = require("./estadoPaquete");

const Paquete = db.define('paquete',{
    idPaquete:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigoQrPaquete:{
        type: DataTypes.STRING,
    },
    documentoUsuario:{
        type:DataTypes.INTEGER,
    },
    documentoCliente:{
        type: DataTypes.INTEGER,
    },
    idEstado: {
        type: DataTypes.INTEGER,
    },
});
//Paquete.hasOne(TipoDocumentoUsuario, { foreignKey: 'idTipoDocumentoUsuario'});
module.exports = Paquete;