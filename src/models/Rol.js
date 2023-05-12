const { DataTypes } = require("sequelize");
const db = require ("../db/database");

const Rol = db.define('Roles',{
    rol:{
        type:DataTypes.STRING,
    },
    descripcion:{
        type:DataTypes.STRING,
    },
    activo:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Rol;