const { DataTypes } = require("sequelize");
const db = require("../db/database");

const TamanoPaquete = db.define('tamanopaquete', {
    idTamano: {
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
    tamanoPaquete: {
        type: DataTypes.ENUM('largo', 'ancho', 'alto', 'otro'),
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
});

module.exports = TamanoPaquete;