const { DataTypes } = require("sequelize");
const db = require("../db/database");

const TipoPaquete = db.define('tipopaquete', {
    idTipo: {
        type: DataTypes.INTEGER,    //Numero entero para bases de datos
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
    tipoPaquete: {
        type: DataTypes.ENUM('Fragil', 'Especial', 'Estándar', 'Documento','Otro'),
        allowNull: false,   //Siempre de debe proporcionjar un valor
    },
});

module.exports = TipoPaquete;