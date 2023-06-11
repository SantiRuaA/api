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

  res.json(users);
});


router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const user = await Usuario.findByPk(id, {
    attributes: {
      exclude: ['contrasenaUsuario']
    }
  });

  if(!user){
    return res.json({
      error:"No existe el usuario"
    });
  }

  res.json(user);
});


router.post('/', async (req,res)=>{
  const { documentoUsuario,idTipoDocumento,nombreUsuario,apellidoUsuario,telefonoUsuario,correoUsuario,contrasenaUsuario,idRol,idEstado } = req.body;
  
  if(!documentoUsuario || !idTipoDocumento || !nombreUsuario || !apellidoUsuario || !telefonoUsuario || !correoUsuario || !contrasenaUsuario || !idRol || !idEstado){
    return res.json({
      status:"error",
      msj:"Uno o mas campos vacios"
    });
  }

  if (isNaN(documentoUsuario) || isNaN(telefonoUsuario)) {
    return res.json({
      status: "error",
      msj: "El documento y el telefono deben ser un número",
    });
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d{3,}).{8,}$/;

  if (!passwordRegex.test(contrasenaUsuario)) {
    return res.json({
      status: "error",
      msj: "La contraseña debe contener como mínimo 8 caracteres, una letra mayúscula y al menos 3 caracteres numéricos",
    });
}

  const user = await Usuario.findOne({ where: {correoUsuario}})
  if (user){
    return res.json({
      status:"error",
      msj:"El email ya está en uso"
    });
  }

  if (!isEmail(correoUsuario)) {
    return res.json({
      status:"error",
      msj: "El email no tiene un formato válido",
    });
  }

  const userId = await Usuario.findByPk(documentoUsuario)
  if(userId){
    return res.json({
      status:"error",
      msj:"Ya existe un usuario con ese documento"
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
    status : 'ok',
    msj: 'Usuario creado exitosamente'
  });
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  
  const { documentoUsuario,idTipoDocumento,nombreUsuario,apellidoUsuario,telefonoUsuario,correoUsuario,contrasenaUsuario,idRol,idEstado } = req.body;
  const userId = await Usuario.findByPk(documentoUsuario);


  if(!documentoUsuario || !idTipoDocumento || !nombreUsuario || !apellidoUsuario || !telefonoUsuario || !correoUsuario || !idRol){
    return res.json({
      status:"error",
      msj:"Uno o mas campos vacios"
    });
  }

  if (isNaN(documentoUsuario) || isNaN(telefonoUsuario)) {
    return res.json({
      status: "error",
      msj: "El documento y el telefono deben ser un número",
    });
  }

  if (!userId) {
    return res.json({ msj: 'El usuario no existe' });
  }

  if(documentoUsuario !== userId.documentoUsuario){
    return res.json({
      status:"error",
      msj:"No puedes cambiar el documento de un usuario"
    });
  }

  if (!isEmail(correoUsuario)) {
    return res.json({
      status:"error",
      msj: "El email no tiene un formato válido",
    });
  }

  if(correoUsuario !== userId.correoUsuario){
    const emailExists = await Usuario.findOne({ where: { correoUsuario } });
    if (emailExists) {
      return res.json({
        status:"error",
        msj: 'El email ya lo tiene otro usuario papi'
      });
    }
  }

  
  const salt = bcryptjs.genSaltSync();
  let pwdEncrypt = contrasenaUsuario;
  
  if (contrasenaUsuario) { // Si se proporciona una contraseña, se encripta
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d{3,}).{8,}$/;
  
    if (!passwordRegex.test(contrasenaUsuario)) {
      return res.json({
        status: "error",
        msj: "La contraseña debe contener como mínimo 8 caracteres, una letra mayúscula y al menos 3 caracteres numéricos",
      });
  }
    pwdEncrypt = bcryptjs.hashSync(contrasenaUsuario, salt);
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

  await userId.update({ 
    documentoUsuario, 
    idTipoDocumento, 
    nombreUsuario, 
    apellidoUsuario, 
    telefonoUsuario, 
    correoUsuario, 
    contrasenaUsuario: pwdEncrypt || userId.contrasenaUsuario, // Si contrasenaUsuario es vacío, se mantiene la contraseña actual 
    idRol,
    idEstado
  });

  const userCr = await Usuario.findByPk(id);
  
  res.json({
    status : 'ok',
    msj: 'Usuario actualizado con exito'
  });
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = await Usuario.findByPk(id);

  if (!userId) {
    return res.json({ msj: 'El usuario no existe o ya ha sido eliminado' });
  }

  await userId.destroy();

  res.json({
    status : 'ok',
    msj: 'Usuario eliminado con exito'
  });
});
  
module.exports = router