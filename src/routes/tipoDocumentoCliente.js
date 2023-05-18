const TipoDocumentoCliente = require('../models/tipoDocumentoCliente');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router()


router.get('/', validateJWT, validateRol, async (req,res)=>{
  const tipoDocClts = await TipoDocumentoCliente.findAll();

  res.json({
    Tipos: tipoDocClts
  });
});


router.get('/:id', validateJWT, validateRol, async(req,res)=>{
  const { id } = req.params;
  const tipoDocClt = await TipoDocumentoCliente.findByPk(id)

  if(!tipoDocClt){
    return res.status(404).json({
      error:"No existe el tipo de documento de cliente"
    });
  }

  res.json({
    msj: 'Informacion de tipoDocumentoCliente',
    Tipo: tipoDocClt
  });
});


router.post('/', validateJWT, validateRol, async (req,res)=>{
  const { idTipoDocumento,nombreTipo } = req.body;
  const tipo = await TipoDocumentoCliente.findOne({ where: {nombreTipo}})
  if(!nombreTipo || !idTipoDocumento){
    return res.status(400).json({
      error:"Uno o mas campos vacios"
    });
  }

  if(tipo){
    return res.status(400).json({
      error:"El tipo de documento ya existe mibro"
    });
  }

  if (!TipoDocumentoCliente.rawAttributes.nombreTipo.values.includes(nombreTipo)) {
    return res.status(400).json({
        error:"Valor no permitido para el campo tipoDocumentoCliente"
    })
  }

  const tipoDocClt = await TipoDocumentoCliente.create({idTipoDocumento, nombreTipo})

  res.json({
    msj: 'TipoDocumentoCliente creado exitosamente',
    Tipo: tipoDocClt
  });
});


router.put('/:id', validateJWT, validateRol, async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoDocumentoCliente.findByPk(id);
  const { nombreTipo, ...resto } = req.body;

  if (!nombreTipo){
    return res.status(400).json({
      error:"Uno o más campos vacios"
    })
}

  if (!tipoId) {
    return res.json({ msj: 'El tipo de documento no existe' });
  }

  if (!TipoDocumentoCliente.rawAttributes.nombreTipo.values.includes(nombreTipo)) {
    return res.status(400).json({
        error:"Valor no permitido para el campo tipoDocumentoCliente"
    })
  }

  const tipoExists = await TipoDocumentoCliente.findOne({ where: { nombreTipo } });

  if (tipoExists) {
    return res.status(400).json({
      error: 'El tipo de documento ya existe'
    });
  }

  await tipoId.update({ nombreTipo, ...resto });

  res.json({
    msj: 'TipoDocumentoCliente actualizado con exito',
    Tipo: tipoId
  });
});


router.delete('/:id', validateJWT, validateRol, async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoDocumentoCliente.findByPk(id);

  if (!tipoId) {
    return res.json({ msj: 'El tipo de documento no existe o ya ha sido eliminado' });
  }

  await tipoId.destroy();

  res.json({
    msj: 'TipoDocumentoCliente eliminado con exito',
    Tipo: tipoId
  });
});

module.exports = router