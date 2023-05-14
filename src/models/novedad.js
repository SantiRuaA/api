const { DataTypes } = require("sequelize");
const db = require("../db/database");
const TipoNovedad = require("./tipoNovedad");
const Entrega = require("./entrega");

const Novedad = db.define('novedad',{
    idNovedad:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcionNovedad:{
        type: DataTypes.STRING,
    },
    idTipoNovedad:{
        type:DataTypes.INTEGER,
    },
    idEntrega:{
        type: DataTypes.INTEGER,
    }
});
//Paquete.hasOne(TipoDocumentoUsuario, { foreignKey: 'idTipoDocumentoUsuario'});
module.exports = Novedad;