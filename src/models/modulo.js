const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Modulo = db.define('modulo',{
    idModulo:{
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,       
        autoIncrement: true,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
    modulo: {
        type: DataTypes.ENUM('cliente','paquete','usuario','entrega','novedad','rol'),
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
});

module.exports = Modulo;