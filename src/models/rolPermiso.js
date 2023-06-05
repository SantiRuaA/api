const { DataTypes } = require("sequelize");
const db = require("../db/database");
const Rol = require("./Rol");
const Permiso = require("./permiso");

const RolPermiso = db.define('rolPermiso',{
    idRolPermiso:{
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,       
        autoIncrement: true,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
    idRol: {
        type: DataTypes.INTEGER,
    },
    idPermiso:{
        type: DataTypes.INTEGER,
    },
});
RolPermiso.hasOne(Rol, { foreignKey: 'idRol'});
RolPermiso.hasOne(Permiso, { foreignKey: 'idPermiso'});


module.exports = RolPermiso;