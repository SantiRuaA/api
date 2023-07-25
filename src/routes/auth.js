const transporter = require('../middlewares/mailer');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { generateJWT } = require('../helpers/generateJWT');
const router = require('express').Router()

router.post('/login', async (req, res) => {

    const { correoUsuario, contrasenaUsuario } = req.body;

    if (!correoUsuario || !contrasenaUsuario) {
        return res.json({
            status: "error",
            msj: "Correo y/o contraseña vacios."
        });
    }

    const user = await Usuario.findOne({ where: { correoUsuario } });

    try {
        if (!user) {
            return res.json({
                status: "error",
                msj: "Credenciales incorrectas."
            });
        }

        const validPassword = bcryptjs.compareSync(contrasenaUsuario, user.contrasenaUsuario);
        if (!validPassword) {
            return res.json({
                status: "error",
                msj: "Credenciales incorrectas."
            });
        }

        if (user.idEstado == 2) {
            return res.json({
                status: "error",
                msj: "Usuario no habilitado."
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
            msj: 'Error en el servidor.'
        });
    }

});


router.post('/forgot-pwd', async (req, res) => {
    const { documentoUsuario, correoUsuario } = req.body;

    if (!correoUsuario || !documentoUsuario) {
        return res.json({
            status: "error",
            msj: "Todos los campos son requeridos."
        });
    }

    const user = await Usuario.findOne({ where: { correoUsuario, documentoUsuario } });

    try {
        if (!user) {
            return res.json({
                status: "error",
                msj: "Credenciales incorrectas."
            });
        }

        const token = await generateJWT(user.idUsuario);
        let verificacionLink = `http://localhost:3030/new-pwd/${token}`;

        // Utiliza el transporter existente para enviar el correo electrónico
        await transporter.sendMail({
            from: '"Star ☆ Routing" <soporte.starrouting@gmail.com>', // sender address
            to: user.correoUsuario, // list of receivers
            subject: "Recuperar contraseña", // Subject line
            html: `
                <h2>Recupera tu contraseña</h2>
                <p>Para recuperar tu contraseña, haz clic <a href="${verificacionLink}" style="color: #007BFF; text-decoration: none">aquí</a> ;)</p>
                <br><br><br><hr>
                <p style="color: #666666; margin: 0;">Este es un correo electrónico generado automáticamente. Por favor, no respondas a este mensaje.</p>
                <p style="color: #666666; margin: 0;">Gracias,</p>
                <p style="color: #9C27B0; margin: 0;"><strong>El equipo de Star ☆ Routing</strong></p>
            `, // html body
        });


        return res.json({
            status: "ok",
            msj: "Hemos enviado un correo electrónico a tu cuenta con un enlace para restablecer tu contraseña.",
        });

    } catch (error) {
        return res.json({
            status: 'error',
            msj: 'Error en el servidor.',
            error: error
        });
    }
});


router.post('/new-pwd/:token', async (req, res) => {
    const { token } = req.params;
    const { newPwd } = req.body;

    try {
        const decodedToken = jwt.verify(token, process.env.JWTSECRET);
        const userId = decodedToken.uid;

        const user = await Usuario.findByPk(userId);
        if (!user) {
            return res.json({
                status: "error",
                msj: "Usuario no encontrado."
            });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d.*\d)(?=.*[!@#$%^&+=?.:,"°~;_¿¡*/{}|<>()]).{8,}$/;
        if (!passwordRegex.test(newPwd)) {
            return res.json({
                status: "error",
                msj: "La contraseña debe contener mínimo: 8 caracteres, una minúscula, una mayúscula, 3 números y 1 caracter especial.",
            });
        }

        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(newPwd, salt);

        user.contrasenaUsuario = hashedPassword;
        await user.save();

        return res.json({
            status: "ok",
            msj: "Contraseña actualizada exitosamente."
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msj: 'Error en el servidor al cambiar la contraseña.',
        });
    }
});


module.exports = router