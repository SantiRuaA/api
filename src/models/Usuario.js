const { DataTypes } = require("sequelize");
const db = require("../db/database");
const Rol = require("./rol");

const Usuario = db.define('usuario',{
    nombre:{
        type:DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    idRol: {
        type: DataTypes.INTEGER,
    }
});

Usuario.hasOne(Rol, { foreignKey: 'idRol'});
module.exports = Usuario;