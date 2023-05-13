const TipoDocumentoUsuario = require('../models/tipoDocumentoUsuario');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
  const tipoDocUsers = await TipoDocumentoUsuario.findAll();

  res.json(tipoDocUsers);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const tipoDocUsuario = await TipoDocumentoUsuario.findByPk(id)
  res.json(tipoDocUsuario);
});

//Crear usuario
router.post('/', async (req,res)=>{
  const { nombreTipo } = req.body;
  const tipo = await TipoDocumentoUsuario.findOne({ where: {nombreTipo}})
  if(!nombreTipo){
    return res.status(400).json({
        error:"Uno o mas campos vacios"
    });
  }

  if(tipo){
    return res.status(400).json({
      error:"El tipo de documento ya existe mibro"
    });
  }
  const tipoDocUser = await TipoDocumentoUsuario.create({nombreTipo})

  res.json(tipoDocUser);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoDocumentoUsuario.findByPk(id);
  const { nombreTipo, ...resto } = req.body;

  if (!nombreTipo){
    return res.status(400).json({
      error:"Uno o más campos vacios"
    })
  }

  if (!tipoId) {
    return res.json({ msj: 'El tipo de documento no existe' });
  }

  const tipoExists = await TipoDocumentoUsuario.findOne({ where: { nombreTipo } });

  if (tipoExists) {
    return res.status(400).json({
      error: 'El tipo de documento ya existe'
    });
  }

  await tipoId.update({ nombreTipo, ...resto });

  res.json({
    msj: 'Tipo de documento actualizado yujuu',
    tipoDoc: tipoId
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoDocumentoUsuario.findByPk(id);

  if (!tipoId) {
    return res.json({ msj: 'El tipo de documento no existe o ya ha sido eliminado' });
  }

  await tipoId.destroy();

  res.json({
    msj: 'Tipo de documento eliminado con exito',
    tipoDoc: tipoId
  });
});

module.exports = router