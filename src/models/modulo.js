const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Modulo = db.define('Modulos',{
    idModulo:{
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,       
        autoIncrement: true,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
    modulo: {
        type: DataTypes.STRING,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
});

module.exports = Modulo;