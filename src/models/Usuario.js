const { DataTypes } = require("sequelize");
const db = require("../db/database");
const Rol = require("./rol");

const Usuario = db.define('usuario',{
    documentoUsuario:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idTipoDocumento:{
        type: DataTypes.INTEGER,
    },
    nombreUsuario:{
        type:DataTypes.STRING,
    },
    apellidoUsuario:{
        type: DataTypes.STRING,
    },
    telefonoUsuario:{
        type: DataTypes.STRING,
    },
    correoUsuario: {
        type: DataTypes.STRING,
        unique: true,
    },
    contrasenaUsuario: {
        type: DataTypes.STRING,
    },
    idRol: {
        type: DataTypes.INTEGER,
    },
    idEstado:{
        type: DataTypes.INTEGER,
    },
});

Usuario.hasOne(Rol, { foreignKey: 'idRol'});
module.exports = Usuario;