const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Rol = db.define('rol', {
    idRol: {
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,
        autoIncrement: true,
    },
    nombreRol: {
        type: DataTypes.STRING,
    },
});

module.exports = Rol;