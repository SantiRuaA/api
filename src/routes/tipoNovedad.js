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
  const { idTipoNovedad, tipoNovedad } = req.body;
  const tipo = await TipoNovedad.findOne({ where: {tipoNovedad}})
  const tipoId = await TipoNovedad.findByPk(idTipoNovedad)
  if(!tipoNovedad || !idTipoNovedad){
    return res.status(400).json({
      error:"Uno o mas campos vacios"
    });
  }

  if(tipo){
    return res.status(400).json({
        error:"El tipo de novedad ya existe"
    });
  }

  if (!TipoNovedad.rawAttributes.tipoNovedad.values.includes(tipoNovedad)) {
    return res.status(400).json({
        error:"Valor no permitido para el campo tipo novedad"
    })
}

  if(tipoId){
    return res.status(400).json({
      error:"Ya existe una novedad con ese ID"
    });
  }

  const novedad = await TipoNovedad.create({idTipoNovedad, tipoNovedad})

  res.json(novedad);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoNovedad.findByPk(id);
  const { idTipoNovedad, tipoNovedad, ...resto } = req.body;

  if(!tipoNovedad || !idTipoNovedad){
    return res.status(400).json({
      error:"Uno o mas campos vacios"
    });
  }

  if (!tipoId) {
    return res.json({ msj: 'El tipo de novedad no existe' });
  }

  /* if (id !== idTipoNovedad) {
      return res.status(400).json({
        error: "El ID en el enlace no coincide con el ID en el cuerpo"
      });
  } */

  if (!TipoNovedad.rawAttributes.tipoNovedad.values.includes(tipoNovedad)) {
    return res.status(400).json({
        error:"Valor no permitido para el campo tipo novedad"
    })
  }

  const tipoDocId = await TipoNovedad.findByPk(idTipoNovedad) 
  if(tipoDocId){
    return res.status(400).json({
      error:"Ya existe una novedad con ese ID"
    });
  }

  const tipoExists = await TipoNovedad.findOne({ where: { tipoNovedad } });
  if (tipoExists) {
    return res.status(400).json({
      error: 'El tipo de novedad ya existe'
    });
  }

  await tipoId.update({ tipoNovedad, ...resto });

  res.json({
    msj: 'Novedad actualizado yujuu',
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