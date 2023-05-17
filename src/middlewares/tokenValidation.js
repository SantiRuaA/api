const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

const validateJWT = async (req, res, next) =>{ //el next es pa cuando todo este melo seguir papi
    /* const token = req.header('x-token') // el token viene del header del thunder
    if(!token){
        return res.status(401).json({msj: 'y el token?? 😐'})
    } */

    try {
        const {uid} = jwt.verify(token, process.env.JWTSECRET)
        req.uid = uid
        const user = await Usuario.findByPk(uid)
        if(!user){
            return res.status(401).json({msj: 'token no valido - el usuario no está registrado 🤥'})
        }
        if(!user.idEstado){
            return res.status(401).json({msj: 'token no valido - usuario no habilitado 🤨'})
        }
        req.user = user
        next();
    } catch (error) {
        return res.status(500).json({msj: 'token no valido'})
    }
}

module.exports = validateJWT