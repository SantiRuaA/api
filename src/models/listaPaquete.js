const { DataTypes } = require("sequelize");
const db = require("../db/database");
const Paquete = require("./paquete")

const ListaPaquete = db.define('listaPaquetes',{
    idLista:{
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,       
        autoIncrement: true,
    },
    idPaquete: {
        type: DataTypes.INTEGER,
    },
});

//ListaPaquete.hasOne(Paquete, { foreignKey: 'idPaquete'});
module.exports = ListaPaquete;