const jwt = require('jsonwebtoken');
require('dotenv').config();

//funcion que toma el id del user logueado, me retorna una promesa
const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWTSECRET, { // tomamos la auth con el token
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token.')
            } else {
                resolve(token)
            }
        });
    });
};

module.exports = { generateJWT };