const Permiso = require('../models/permiso');
const Modulo = require('../models/modulo');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
  const permisos = await Permiso.findAll();

  res.json(permisos);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const permiso = await Permiso.findByPk(id)
  res.json(permiso);
});

//Crear usuario
router.post('/', async (req,res)=>{
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

  res.json(permiso);
});

router.put('/:id', async (req, res) => {
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
    msj: 'Permiso actualizado yujuu',
    permiso: permiId
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const permiId = await Permiso.findByPk(id);

  if (!permiId) {
    return res.json({ msj: 'El permiso no existe o ya ha sido eliminado' });
  }

  await permiId.destroy();

  res.json({
    msj: 'Permiso eliminado con exito',
    permiso: permiId
  });
});
  

module.exports = router