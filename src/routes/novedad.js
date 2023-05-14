const Novedad = require('../models/novedad');
const TipoNovedad = require('../models/tipoNovedad');
const Entrega = require('../models/entrega');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
  const novedades = await Novedad.findAll();

  res.json(novedades);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const novedad = await Novedad.findByPk(id)
  if(!novedad){
    return res.status(404).json({
      error:"No existe la novedad"
    });
  }
  res.json(novedad);
});

//Crear usuario
router.post('/', async (req,res)=>{
  const { descripcionNovedad, idTipoNovedad, idEntrega } = req.body;
  
  if(!descripcionNovedad||!idTipoNovedad||!idEntrega){
    return res.status(400).json({
        error:"Uno o mas campos vacios"
    });
  }
  

  const novedad1 = await TipoNovedad.findByPk(idTipoNovedad);
  if (!novedad1) {
    return res.status(400).json({
    error: 'El tipo de novedad no existe'
    }); 
  }

  const entrega = await Entrega.findByPk(idEntrega);
  if (!entrega) {
    return res.status(400).json({
    error: 'La entrega no existe'
    }); 
  }

  const novedad = await Novedad.create({descripcionNovedad, idTipoNovedad, idEntrega})

  res.json(novedad);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const novId = await Novedad.findByPk(id);

  if (!novId) {
    return res.json({ msj: 'La novedad no existe o ya ha sido eliminado' });
  }

  await novId.destroy();

  res.json({
    msj: 'Novedad eliminado con exito',
    paquete: novId
  });
});
  

module.exports = router