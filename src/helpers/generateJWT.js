const jwt = require('jsonwebtoken');
require('dotenv').config();

//funcion que toma el id del user logueado, me retorna una promesa
const generateJWT = (uid) => {
    console.log("uid recibido:",uid);
    return new Promise((resolve, reject) => {
        const payload = {uid};
        console.log("payload:",payload);
        jwt.sign(payload, process.env.JWTSECRET, { //tomamos la auth con el token
            expiresIn: '12h'
        }, (err, token) => {
            if(err){
                console.log(err)
                reject('No se pudo generar el token, gueva 😛')
            }else{
                console.log("token generado:",token);
                resolve(token)
            }
        });
    });
};

module.exports = {generateJWT};