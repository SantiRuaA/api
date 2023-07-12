const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generateJWT } = require('../helpers/generateJWT');
const router = require('express').Router()

router.post('/', async (req, res) => {

    const { correoUsuario, contrasenaUsuario } = req.body;

    if (!correoUsuario || !contrasenaUsuario) {
        return res.json({
            status: "error",
            msj: "Correo y/o contraseña vacios"
        });
    }

    try {
        const user = await Usuario.findOne({ where: { correoUsuario } });
        if (user) {
            const validPassword = bcryptjs.compareSync(contrasenaUsuario, user.contrasenaUsuario)
            if (!validPassword) {
                return res.json({
                    status: "error",
                    msj: "Contraseña incorrecta"
                });
            }
        } else {
            return res.json({
                status: "error",
                msj: "Correo incorrecto"
            });
        }


        if (user.idEstado == 2) {
            return res.json({
                status: "error",
                msj: "Usuario no habilitado"
            });
        }

        /* if(user.idRol != 1 ){
            return res.json({
                status: "error",
                msj: "Usted no es admin"
            });
        } */

        const token = await generateJWT(user.idUsuario);

        res.json({
            status: "ok",
            msj: "User comprobao 🥶", user, token
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msj: 'Error en el servidor'
        })
    }
});

module.exports = router