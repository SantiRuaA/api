const { DataTypes } = require("sequelize");
const db = require("../db/database");

const TipoNovedad = db.define('tiponovedad',{
    idTipoNovedad:{
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,       
        autoIncrement: false,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
    tipoNovedad: {
        type: DataTypes.ENUM('Retraso','Devolucion','Otro'),
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
});

module.exports = TipoNovedad;