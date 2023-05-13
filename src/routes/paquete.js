const Paquete = require('../models/paquete');
const Cliente = require('../models/cliente');
const Usuario = require('../models/Usuario');
const EstadoPaquete = require('../models/estadoPaquete');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
  const paquetes = await Paquete.findAll();

  res.json(paquetes);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const paquete = await Paquete.findByPk(id)
  if(!paquete){
    return res.status(404).json({
      error:"No existe el paquete"
    });
  }
  res.json(paquete);
});

//Crear usuario
router.post('/', async (req,res)=>{
  const { codigoQrPaquete,documentoUsuario,documentoCliente,idEstado } = req.body;
  const paq = await Paquete.findOne({ where: {codigoQrPaquete}})
  
  if(!codigoQrPaquete || !documentoUsuario || !documentoCliente || !idEstado){
    return res.status(400).json({
        error:"Uno o mas campos vacios"
    });
  }
  
  if (paq){
    return res.status(400).json({
      error:"El paquete ya existe"
    });
  }

  const userDoc = await Usuario.findByPk(documentoUsuario);
  if (!userDoc) {
    return res.status(400).json({
    error: 'El documento del usuario no existe'
    }); 
  }

  const clDoc = await Cliente.findByPk(documentoCliente);
  if (!clDoc) {
    return res.status(400).json({
    error: 'El documento del cliente no existe'
    }); 
  }

  const estado = await EstadoPaquete.findByPk(idEstado);
  if (!estado) {
    return res.status(400).json({
    error: 'El estado no existe'
    }); 
  }

  const paquete = await Paquete.create({codigoQrPaquete,documentoUsuario,documentoCliente,idEstado})

  res.json(paquete);
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const paqId = await Paquete.findByPk(id);
  const { codigoQrPaquete,documentoUsuario,documentoCliente,idEstado } = req.body;
  const paq = await Paquete.findOne({ where: {codigoQrPaquete}})
  
  if(!codigoQrPaquete || !documentoUsuario || !documentoCliente || !idEstado){
    return res.status(400).json({
        error:"Uno o mas campos vacios"
    });
  }
  
  if (!paqId) {
    return res.status(404).json({
      error:"No existe el paquete"
    });
  }

  if (paq){
    return res.status(400).json({
      error:"El paquete ya existe"
    });
  }

  const userDoc = await Usuario.findByPk(documentoUsuario);
  if (!userDoc) {
    return res.status(400).json({
    error: 'El documento del usuario no existe'
    }); 
  }

  const clDoc = await Cliente.findByPk(documentoCliente);
  if (!clDoc) {
    return res.status(400).json({
    error: 'El documento del cliente no existe'
    }); 
  }

  const estado = await EstadoPaquete.findByPk(idEstado);
  if (!estado) {
    return res.status(400).json({
    error: 'El estado no existe'
    }); 
  }

  await paqId.update({codigoQrPaquete,documentoUsuario,documentoCliente,idEstado})

  res.json(paqId);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const paqId = await Paquete.findByPk(id);

  if (!paqId) {
    return res.json({ msj: 'El paquete no existe o ya ha sido eliminado' });
  }

  await paqId.destroy();

  res.json({
    msj: 'Paquete eliminado con exito',
    paquete: paqId
  });
});
  

module.exports = router