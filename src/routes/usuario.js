const Usuario = require('../models/Usuario');
const Rol = require('../models/rol');
const Estado = require('../models/estadoUsuario');
const TipoDoc = require('../models/tipodocumentousuario');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
  const usuarios = await Usuario.findAll();

  res.json(usuarios);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id)
  res.json(usuario);
});

//Crear usuario
router.post('/', async (req,res)=>{
  const { documentoUsuario,idTipoDocumento,nombreUsuario,apellidoUsuario,telefonoUsuario,correoUsuario,contrasenaUsuario,idRol,idEstado } = req.body;
  
  
  if(!documentoUsuario || !idTipoDocumento || !nombreUsuario || !apellidoUsuario || !telefonoUsuario || !correoUsuario || !contrasenaUsuario || !idRol || !idEstado){
    return res.status(400).json({
        error:"Uno o mas campos vacios"
    });
  }

  const user = await Usuario.findOne({ where: {correoUsuario}})
  if (user){
    return res.status(400).json({
      error:"El usuario ya existe"
    });
  }

  const userId = await Usuario.findByPk(documentoUsuario)
    if(userId){
        return res.status(400).json({
          error:"Ya existe un usuario con ese documento"
        });
    }

  const rol = await Rol.findByPk(idRol);
  if (!rol) {
    return res.status(400).json({
    error: 'El idRol proporcionado no es válido'
    });
  }

  const estado = await Estado.findByPk(idEstado);
  if (!estado) {
    return res.status(400).json({
    error: 'El idEstado proporcionado no es válido'
    });
  }

  const tipoDoc = await TipoDoc.findByPk(idTipoDocumento);
  if (!tipoDoc) {
    return res.status(400).json({
    error: 'El idTipoDocumento proporcionado no es válido'
    });
  }

  const usuario = await Usuario.create({documentoUsuario,idTipoDocumento,nombreUsuario,apellidoUsuario,telefonoUsuario,correoUsuario,contrasenaUsuario,idRol,idEstado})

  res.json(usuario);
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = await Usuario.findByPk(id);
  const { documentoUsuario,idTipoDocumento,nombreUsuario,apellidoUsuario,telefonoUsuario,correoUsuario,contrasenaUsuario,idRol,idEstado } = req.body;
  
  if(!documentoUsuario || !idTipoDocumento || !nombreUsuario || !apellidoUsuario || !telefonoUsuario || !correoUsuario || !contrasenaUsuario || !idRol || !idEstado){
    return res.status(400).json({
      error:"Uno o mas campos vacios"
    });
  }

  if (!userId) {
    return res.json({ msj: 'El usuario no existe' });
  }
  const userDoc = await Usuario.findByPk(documentoUsuario)
  if(userDoc){
    return res.status(400).json({
      error:"Ya existe un usuario con ese documento"
    });
  }
  
  
  const userExists = await Usuario.findOne({ where: { correoUsuario } });
  if (userExists) {
    return res.status(400).json({
      error: 'El email ya lo tiene otro usuario papi'
    });
  }

  const rol = await Rol.findByPk(idRol);
  if (!rol) {
    return res.status(400).json({
    error: 'El idRol proporcionado no es válido'
    });
  }

  const estado = await Estado.findByPk(idEstado);
  if (!estado) {
    return res.status(400).json({
    error: 'El idEstado proporcionado no es válido'
    });
  }

  const tipoDoc = await TipoDoc.findByPk(idTipoDocumento);
  if (!tipoDoc) {
    return res.status(400).json({
    error: 'El idTipoDocumento proporcionado no es válido'
    });
  }

  const userNew = await Usuario.create({documentoUsuario,idTipoDocumento,nombreUsuario,apellidoUsuario,telefonoUsuario,correoUsuario,contrasenaUsuario,idRol,idEstado})
  res.json({
    msj: 'Usuario actualizado yujuu',
    usuario: userNew
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
    msj: 'Usuario eliminado con exito',
    usuario: userId
  });
});
  

module.exports = router