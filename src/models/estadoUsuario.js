const { DataTypes } = require("sequelize");
const db = require("../db/database");

const EstadoUsuario = db.define('estadousuario',{
    idEstado:{
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,       
        autoIncrement: false,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
    estadoUsuario: {
        type: DataTypes.ENUM('activo','inactivo')
    },
});

module.exports = EstadoUsuario;