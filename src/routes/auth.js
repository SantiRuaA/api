const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generateJWT } = require('../helpers/generateJWT');
const router = require('express').Router()

router.post('/', async (req, res) => {

    const {correoUsuario, contrasenaUsuario} = req.body;
    
    try{
        const user = await Usuario.findOne({where: {correoUsuario}});
        if(!user){
            return res.status(400).json({msj: "Username incorrecto"});
        }
        
        const validPassword = bcryptjs.compareSync(contrasenaUsuario, user.contrasenaUsuario)
        if(!validPassword){
            return res.status(400).json({msj: "Password incorrecta"});
        }

        if(user.idEstado == 2){
            return res.status(400).json({msj: "Usuario no habilitado"});
        }

        const token = await generateJWT(user.documentoUsuario);

        res.json({msj: "User comprobao 🥶", user, token});

    }catch(error){
        return res.status(500).json({msj: 'Error en el servidor'})
    }
});

module.exports = router