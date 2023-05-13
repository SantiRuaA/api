const TipoDocumentoCliente = require('../models/tipoDocumentoCliente');

const router = require('express').Router()

//obtener todos los Clientes
router.get('/', async (req,res)=>{
  const tipoDocCusts = await TipoDocumentoCliente.findAll();

  res.json(tipoDocCusts);
});

//Obtener un solo Cliente
router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const tipoDocCliente = await TipoDocumentoCliente.findByPk(id)
  res.json(tipoDocCliente);
});

//Crear Cliente
router.post('/', async (req,res)=>{
  const { nombreTipo } = req.body;
  const tipo = await TipoDocumentoCliente.findOne({ where: {nombreTipo}})
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
  const tipoDocCust = await TipoDocumentoCliente.create({nombreTipo})

  res.json(tipoDocCust);
});

router.put('/:id', async (req, res) => {
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

  const tipoExists = await TipoDocumentoCliente.findOne({ where: { nombreTipo } });

  if (tipoExists) {
    return res.status(400).json({
      error: 'El tipo de documento ya existe'
    });
  }

  await tipoId.update({ nombreTipo, ...resto });

  res.json({
    msj: 'Tipo de documento actualizado yujuu',
    tipoCust: tipoId
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoDocumentoCliente.findByPk(id);

  if (!tipoId) {
    return res.json({ msj: 'El tipo de documento no existe o ya ha sido eliminado' });
  }

  await tipoId.destroy();

  res.json({
    msj: 'Tipo de documento eliminado con exito',
    tipoCust: tipoId
  });
});

module.exports = router