const { DataTypes } = require("sequelize");
const db = require("../db/database");

const TipoDocumentoUsuario = db.define('tipodocumentousuario',{
    idTipoDocumento:{
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,       
        autoIncrement: true,
        allowNull: true,   //Siempre de debe proporcionjar un valor
    },
    nombreTipo: {
        type: DataTypes.ENUM('cedulaCiudadania', 'cedulaExtranjeria','pasaporte', 'tarjetaIdentidad'),
    },
});

module.exports = TipoDocumentoUsuario;