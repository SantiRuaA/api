const { DataTypes } = require("sequelize");
const db = require("../db/database");

const TipoDocumentoCliente = db.define('tipodocumentocliente',{
    idTipoDocumento:{
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,       
        autoIncrement: true,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
    nombreTipo: {
        type: DataTypes.ENUM('cedulaCiudadania', 'cedulaExtranjeria', 'nit', 'pasaporte', 'tarjetaIdentidad'),
    },
});

module.exports = TipoDocumentoCliente;