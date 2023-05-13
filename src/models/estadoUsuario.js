const { DataTypes } = require("sequelize");
const db = require("../db/database");

const EstadoUsuario = db.define('EstadoUsuarios',{
    idEstado:{
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,       
        autoIncrement: true,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
    estadoUsuario: {
        type: DataTypes.STRING,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
});

module.exports = EstadoUsuario;