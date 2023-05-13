const TipoNovedad = require('../models/tipoNovedad');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
  const novedades = await TipoNovedad.findAll();

  res.json(novedades);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const novedad = await TipoNovedad.findByPk(id)
  res.json(novedad);
});

//Crear usuario
router.post('/', async (req,res)=>{
  const { tipoNovedad } = req.body;
  const tipo = await TipoNovedad.findOne({ where: {tipoNovedad}})
  if(!tipoNovedad){
    return res.status(400).json({
      error:"Uno o mas campos vacios"
    });
  }

  if(tipo){
    return res.status(400).json({
        error:"El tipo de novedad ya existe mibro"
    });
  }
  const novedad = await TipoNovedad.create({tipoNovedad})

  res.json(novedad);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoNovedad.findByPk(id);
  const { tipoNovedad, ...resto } = req.body;

  if(!tipoNovedad){
    return res.status(400).json({
      error:"Uno o mas campos vacios"
    });
  }

  if (!tipoId) {
    return res.json({ msj: 'El tipo de novedad no existe' });
  }

  const tipoExists = await TipoNovedad.findOne({ where: { tipoNovedad } });

  if (tipoExists) {
    return res.status(400).json({
      error: 'El tipo de novedad ya existe'
    });
  }

  await tipoId.update({ tipoNovedad, ...resto });

  res.json({
    msj: 'Usuario actualizado yujuu',
    novedad: tipoId
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoNovedad.findByPk(id);

  if (!tipoId) {
    return res.json({ msj: 'El tipo de novedad no existe o ya ha sido eliminada' });
  }

  await tipoId.destroy();

  res.json({
    msj: 'Tipo de novedad eliminada con exito',
    tipo: tipoId
  });
});

module.exports = router