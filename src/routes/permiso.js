const Permiso = require('../models/permiso');
const Modulo = require('../models/modulo');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router()


router.get('/', validateJWT, validateRol, async (req,res)=>{
  const permisos = await Permiso.findAll();

  res.json({
    Permisos: permisos
  });
});


router.get('/:id', validateJWT, validateRol, async(req,res)=>{
  const { id } = req.params;
  const permiso = await Permiso.findByPk(id)

  if(!permiso){
    return res.status(404).json({
      error:"No existe el permiso"
    });
  }

  res.json({
    msj: 'Informacion de permiso',
    Permiso: permiso
  });
});


router.post('/', validateJWT, validateRol, async (req,res)=>{
  const { nombrePermiso,idModulo } = req.body;
  const permi = await Permiso.findOne({ where: {nombrePermiso}})
  
  if(!nombrePermiso || !idModulo ){
    return res.status(400).json({
        error:"Uno o mas campos vacios"
    });
  }
  if (permi){
    return res.status(400).json({
      error:"El permiso ya existe"
    });
  }

  const modulo = await Modulo.findByPk(idModulo);
  if (!modulo) {
    return res.status(400).json({
    error: 'El idModulo proporcionado no es válido'
    });
  }

  const permiso = await Permiso.create({nombrePermiso,idModulo})

  res.json({
    msj: 'Permiso creado exitosamente',
    Permiso: permiso
  });
});


router.put('/:id', validateJWT, validateRol, async (req, res) => {
  const { id } = req.params;
  const permiId = await Permiso.findByPk(id);
  const { nombrePermiso,idModulo, ...resto } = req.body;
  
  if(!nombrePermiso || !idModulo ){
    return res.status(400).json({
      error:"Uno o mas campos vacios"
    });
  }

  if (!permiId) {
    return res.json({ msj: 'El permiso no existe' });
  }
  
  const permiExists = await Permiso.findOne({ where: { nombrePermiso } });

  if (permiExists) {
    return res.status(400).json({
      error: 'El permiso ya existe bro'
    });
  }

  const modulo = await Modulo.findByPk(idModulo);
  if (!modulo) {
    return res.status(400).json({
    error: 'El idModulo proporcionado no es válido'
    });
  }

  await permiId.update({ nombrePermiso, idModulo, ...resto });

  res.json({
    msj: 'Permiso actualizado con exito',
    Permiso: permiId
  });
});

router.delete('/:id', validateJWT, validateRol, async (req, res) => {
  const { id } = req.params;
  const permiId = await Permiso.findByPk(id);

  if (!permiId) {
    return res.json({ msj: 'El permiso no existe o ya ha sido eliminado' });
  }

  await permiId.destroy();

  res.json({
    msj: 'Permiso eliminado con exito',
    Permiso: permiId
  });
});
  

module.exports = router