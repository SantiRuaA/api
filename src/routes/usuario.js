const Usuario = require('../models/Usuario');
const Rol = require('../models/rol');
const Estado = require('../models/estadoUsuario');
const TipoDoc = require('../models/tipodocumentousuario');
const bcryptjs = require('bcryptjs');
const {isEmail} = require('validator');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router()


router.get('/', async (req,res)=>{
  const users = await Usuario.findAll();

  res.json({
    Usuarios: users
  });
});


router.get('/:id', validateJWT, validateRol, async(req,res)=>{
  const { id } = req.params;
  const user = await Usuario.findByPk(id)

  if(!user){
    return res.json({
      error:"No existe el usuario"
    });
  }

  res.json({
    msj: 'Informacion de usuario',
    Usuario: user
  });
});


router.post('/', async (req,res)=>{
  const { documentoUsuario,idTipoDocumento,nombreUsuario,apellidoUsuario,telefonoUsuario,correoUsuario,contrasenaUsuario,idRol,idEstado } = req.body;
  
  if(!documentoUsuario || !idTipoDocumento || !nombreUsuario || !apellidoUsuario || !telefonoUsuario || !correoUsuario || !contrasenaUsuario || !idRol || !idEstado){
    return res.json({
        error:"Uno o mas campos vacios"
    });
  }

  const user = await Usuario.findOne({ where: {correoUsuario}})
  if (user){
    return res.json({
      error:"El email ya está en uso"
    });
  }

  if (!isEmail(correoUsuario)) {
    return res.json({
      error: "El email no tiene un formato válido",
    });
  }

  const userId = await Usuario.findByPk(documentoUsuario)
  if(userId){
    return res.json({
      error:"Ya existe un usuario con ese documento"
    });
  }

  const rol = await Rol.findByPk(idRol);
  if (!rol) {
    return res.json({
    error: 'El idRol proporcionado no es válido'
    });
  }

  const estado = await Estado.findByPk(idEstado);
  if (!estado) {
    return res.json({
    error: 'El idEstado proporcionado no es válido'
    });
  }

  const tipoDoc = await TipoDoc.findByPk(idTipoDocumento);
  if (!tipoDoc) {
    return res.json({
    error: 'El idTipoDocumento proporcionado no es válido'
    });
  }

  const salt = bcryptjs.genSaltSync();
  const pwdEncrypt = bcryptjs.hashSync(contrasenaUsuario, salt);

  const userC = await Usuario.create({documentoUsuario,idTipoDocumento,nombreUsuario,apellidoUsuario,telefonoUsuario,correoUsuario,contrasenaUsuario: pwdEncrypt,idRol,idEstado})

  res.json({
    msj: 'Usuario creado exitosamente',
    Usuario: userC
  });
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = await Usuario.findByPk(id);
  const { documentoUsuario,idTipoDocumento,nombreUsuario,apellidoUsuario,telefonoUsuario,correoUsuario,contrasenaUsuario,idRol,idEstado } = req.body;
  
  if(!documentoUsuario || !idTipoDocumento || !nombreUsuario || !apellidoUsuario || !telefonoUsuario || !correoUsuario || !contrasenaUsuario || !idRol || !idEstado){
    return res.json({
      error:"Uno o mas campos vacios"
    });
  }

  if (!userId) {
    return res.json({ msj: 'El usuario no existe' });
  }
  if(documentoUsuario !== userId.documentoUsuario){
    return res.json({
      error:"No puedes cambiar el documento de un usuario"
    });
  }

  if(correoUsuario !== userId.correoUsuario){
    const emailExists = await Usuario.findOne({ where: { correoUsuario } });
    if (emailExists) {
      return res.json({
        error: 'El email ya lo tiene otro usuario papi'
      });
    }
  }
  
  const salt = bcryptjs.genSaltSync();
  const pwdEncrypt = bcryptjs.hashSync(contrasenaUsuario, salt);

  const rol = await Rol.findByPk(idRol);
  if (!rol) {
    return res.json({
    error: 'El idRol proporcionado no es válido'
    });
  }

  const estado = await Estado.findByPk(idEstado);
  if (!estado) {
    return res.json({
    error: 'El idEstado proporcionado no es válido'
    });
  }

  const tipoDoc = await TipoDoc.findByPk(idTipoDocumento);
  if (!tipoDoc) {
    return res.json({
    error: 'El idTipoDocumento proporcionado no es válido'
    });
  }

  await userId.update({ documentoUsuario, idTipoDocumento, nombreUsuario, apellidoUsuario, telefonoUsuario, correoUsuario, contrasenaUsuario: pwdEncrypt, idRol, idEstado });
  const userC = await Usuario.findByPk(id);
  res.json({
    msj: 'Usuario actualizado con exito',
    Usuario: userC
  });
});


router.delete('/:id', validateJWT, validateRol, async (req, res) => {
  const { id } = req.params;
  const userId = await Usuario.findByPk(id);

  if (!userId) {
    return res.json({ msj: 'El usuario no existe o ya ha sido eliminado' });
  }

  await userId.destroy();

  res.json({
    msj: 'Usuario eliminado con exito',
    Usuario: userId
  });
});
  
module.exports = router