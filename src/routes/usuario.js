const Usuario = require('../models/Usuario');
const Rol = require('../models/rol');

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
  const { nombre,email,idRol } = req.body;
  const user = await Usuario.findOne({ where: {email}})
  
  if(!nombre || !email || !idRol ){
    return res.status(400).json({
        error:"Uno o mas campos vacios"
    });
  }
  if (user){
    return res.status(400).json({
      error:"El usuario ya existe"
    });
  }
  const rol = await Rol.findByPk(idRol);
  if (!rol) {
    return res.status(400).json({
    error: 'El idRol proporcionado no es válido'
    });
  }
  const usuario = await Usuario.create({nombre,email,idRol})

  res.json(usuario);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = await Usuario.findByPk(id);
  const { nombre, email, idRol, ...resto } = req.body;
  
  if(!nombre || !email || !idRol ){
    return res.status(400).json({
      error:"Uno o mas campos vacios"
    });
  }

  if (!userId) {
    return res.json({ msj: 'El usuario no existe' });
  }
  
  const userExists = await Usuario.findOne({ where: { email } });

  if (userExists) {
    return res.status(400).json({
      error: 'El email ya lo tiene otro usuario papi'
    });
  }

  const rol = await Rol.findByPk(idRol);
  if(!rol){
    return res.status(400).json({
      error:"El idRol proporcionado no es válido"
    });
  }

  await userId.update({ nombre, email, idRol, ...resto });

  res.json({
    msj: 'Usuario actualizado yujuu',
    usuario: userId
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