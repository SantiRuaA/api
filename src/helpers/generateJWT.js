const jwt = require('jsonwebtoken');
const JWTSECRET = "s3cr3t0";

//funcion que toma el id del user logueado, me retorna una promesa
const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, JWTSECRET, { //tomamos la auth con el token
            expiresIn: '1h'
        }, (err, token) => {
            if(err){
                console.log(err)
                reject('No se pudo generar el token, gueva 😛')
            }else{
                resolve(token)
            }
        });
    });
};

module.exports = {generateJWT};