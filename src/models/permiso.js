const { DataTypes } = require("sequelize");
const db = require("../db/database");
const Modulo = require("./modulo");

const Permiso = db.define('permiso',{
    idPermiso:{
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,       
        autoIncrement: true,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
    nombrePermiso: {
        type: DataTypes.STRING,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
    idModulo: {
        type: DataTypes.INTEGER,
    }
});
Permiso.hasOne(Modulo, { foreignKey: 'idModulo'});
module.exports = Permiso;