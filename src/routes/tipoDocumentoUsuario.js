const TipoDocumentoUsuario = require('../models/tipodocumentousuario');

const router = require('express').Router()


router.get('/', async (req,res)=>{
  const tipoDocUsers = await TipoDocumentoUsuario.findAll();

  res.json({
    Tipos: tipoDocUsers
  });
});


router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const tipoDocUser = await TipoDocumentoUsuario.findByPk(id)

  if(!tipoDocUser){
    return res.status(404).json({
      error:"No existe el tipo de documento de usuario"
    });
  }

  res.json({
    msj: 'Informacion de tipoDocumentoUsuario',
    Tipo: tipoDocUser
  });
});


router.post('/', async (req,res)=>{
  const { idTipoDocumento, nombreTipo } = req.body;
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
  const tipoDocUser = await TipoDocumentoUsuario.create({idTipoDocumento,nombreTipo})

  res.json({
    msj: 'TipoDocumentoUsuario creado exitosamente',
    Tipo: tipoDocUser
  });
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
    msj: 'TipoDocumentoUsuario actualizado con exito',
    Tipo: tipoId
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
    msj: 'TipoDocumentoUsuario eliminado con exito',
    Tipo: tipoId
  });
});

module.exports = router