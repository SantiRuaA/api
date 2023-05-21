const TipoDocumentoUsuario = require('../models/tipodocumentousuario');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router()


router.get('/', async (req,res)=>{
  const tipoDocUsers = await TipoDocumentoUsuario.findAll();

  res.json({
    Tipos: tipoDocUsers
  });
});


router.get('/:id', validateJWT, validateRol, async(req,res)=>{
  const { id } = req.params;
  const tipoDocUser = await TipoDocumentoUsuario.findByPk(id)

  if(!tipoDocUser){
    return res.json({
      error:"No existe el tipo de documento de usuario"
    });
  }

  res.json({
    msj: 'Informacion de tipoDocumentoUsuario',
    Tipo: tipoDocUser
  });
});


router.post('/', validateJWT, validateRol, async (req,res)=>{
  const { idTipoDocumento, nombreTipo } = req.body;
  const tipo = await TipoDocumentoUsuario.findOne({ where: {nombreTipo}})
  if(!nombreTipo){
    return res.json({
        error:"Uno o mas campos vacios"
    });
  }

  if(tipo){
    return res.json({
      error:"El tipo de documento ya existe mibro"
    });
  }

  if (!TipoDocumentoUsuario.rawAttributes.nombreTipo.values.includes(nombreTipo)) {
    return res.json({
        error:"Valor no permitido para el campo tipoDocumentoUsuario"
    })
  }

  const tipoDocUser = await TipoDocumentoUsuario.create({idTipoDocumento,nombreTipo})

  res.json({
    msj: 'TipoDocumentoUsuario creado exitosamente',
    Tipo: tipoDocUser
  });
});


router.put('/:id', validateJWT, validateRol, async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoDocumentoUsuario.findByPk(id);
  const { nombreTipo, ...resto } = req.body;

  if (!nombreTipo){
    return res.json({
      error:"Uno o más campos vacios"
    })
  }

  if (!tipoId) {
    return res.json({ msj: 'El tipo de documento no existe' });
  }

  if (!TipoDocumentoUsuario.rawAttributes.nombreTipo.values.includes(nombreTipo)) {
    return res.json({
        error:"Valor no permitido para el campo TipoDocumentoUsuario"
    })
  }

  const tipoExists = await TipoDocumentoUsuario.findOne({ where: { nombreTipo } });

  if (tipoExists) {
    return res.json({
      error: 'El tipo de documento ya existe'
    });
  }

  await tipoId.update({ nombreTipo, ...resto });

  res.json({
    msj: 'TipoDocumentoUsuario actualizado con exito',
    Tipo: tipoId
  });
});


router.delete('/:id', validateJWT, validateRol, async (req, res) => {
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