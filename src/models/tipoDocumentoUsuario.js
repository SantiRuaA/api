const { DataTypes } = require("sequelize");
const db = require("../db/database");

const TipoDocumentoUsuario = db.define('TipoDocumentoUsuarios',{
    idTipoDocumento:{
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,       
        autoIncrement: true,
        allowNull: true,   //Siempre de debe proporcionjar un valor
    },
    nombreTipo: {
        type: DataTypes.STRING,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
});

module.exports = TipoDocumentoUsuario;