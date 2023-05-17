const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')
require('dotenv').config();

const validateJWT = async (req, res, next) =>{ //el next es pa cuando todo este melo seguir papi
    const token = req.header('x-token') // el token viene del header del thunder
    console.log("token:",token);
    if(!token){
        return res.status(401).json({msj: 'y el token?? 😐'})
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWTSECRET)
        console.log("uid:",uid);
        req.uid = uid
        console.log("req.uid:",req.uid);
        const user = await Usuario.findByPk(uid)
        console.log("user:",user);
        if(!user){
            return res.status(401).json({msj: 'token no valido - el usuario no está registrado 🤥'})
        }
        if(user.idEstado != 1){
            return res.status(401).json({msj: 'token no valido - usuario no habilitado 🤨'})
        }
        req.user = user
        next();
    } catch (error) {
        return res.status(500).json({msj: 'token no valido'})
    }
}

module.exports = validateJWT