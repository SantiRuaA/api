const { DataTypes } = require("sequelize");
const db = require("../db/database");
const Lista = require("./listaPaquete");

const Entrega = db.define('entrega',{
    idEntrega:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firmaDestinatario:{
        type: DataTypes.STRING,
    },
    fechaEntrega:{
        type:DataTypes.DATE,
    },
    idLista: {
        type: DataTypes.INTEGER,
    },
});
//Paquete.hasOne(TipoDocumentoUsuario, { foreignKey: 'idTipoDocumentoUsuario'});
module.exports = Entrega;