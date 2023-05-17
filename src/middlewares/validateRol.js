const validateRol = (req, res, next) => {

    const {idRol, correoUsuario} = req.usuario;
    if(idRol !== 1){
        return res.status(401).json({msg: `El usuario ${correoUsuario} no es administrador - acceso denegado 🥱` })

    }
    next();
}

module.exports = validateRol;