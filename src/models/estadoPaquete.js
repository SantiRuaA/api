const { DataTypes } = require("sequelize");
const db = require("../db/database");

const EstadoPaquetes = db.define('estadopaquete',{
    idEstado:{
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,       
        autoIncrement: false,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
    estadoPaquete: {
        type: DataTypes.STRING,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
});

module.exports = EstadoPaquetes;