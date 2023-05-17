const Cliente = require('../models/cliente');
const TipoDocumento = require('../models/tipoDocumentoCliente');
const { isEmail } = require('validator');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router()


router.get('/', validateJWT, validateRol, async (req,res)=>{
  const clientes = await Cliente.findAll();

  res.json({
    Clientes: clientes
  });
});


router.get('/:id', validateJWT, validateRol, async(req,res)=>{
  const { id } = req.params;
  const cliente = await Cliente.findByPk(id)
  
  if(!cliente){
    return res.status(404).json({
      error:"No existe el cliente"
    });
  }

  res.json({
    msj: 'Informacion de cliente',
    Cliente: cliente
  });
});


router.post('/', validateJWT, validateRol, async (req,res)=>{
  const { documentoCliente,idTipoDocumento,nombreCliente,telefonoCliente,correoCliente,direccionCliente } = req.body;
  const user = await Cliente.findOne({ where: {correoCliente}})
  
  if(!documentoCliente||!idTipoDocumento||!nombreCliente||!telefonoCliente||!correoCliente||!direccionCliente){
    return res.status(400).json({
        error:"Uno o mas campos vacios"
    });
  }
  
  if (user){
    return res.status(400).json({
      error:"El correo ya existe"
    });
  }

  const userId = await Cliente.findByPk(documentoCliente)
  if(userId){
      return res.status(400).json({
        error:"Ya existe un cliente con ese documento"
      });
  }

  if (!isEmail(correoCliente)) {
    return res.status(400).json({
      error: "El correo no tiene un formato válido",
    });
  }

  const tDocumento = await TipoDocumento.findByPk(idTipoDocumento);
  if (!tDocumento) {
    return res.status(400).json({
    error: 'El tipo documento no existe'
    }); 
  }
  
  const cliente = await Cliente.create({documentoCliente,idTipoDocumento,nombreCliente,telefonoCliente,correoCliente,direccionCliente})

  res.json({
    msj: 'Cliente creado exitosamente',
    Cliente: cliente
  });
});


router.put('/:id', validateJWT, validateRol, async (req, res) => {
  const { id } = req.params;
  const cltId = await Cliente.findByPk(id);
  const { documentoCliente,idTipoDocumento,nombreCliente,telefonoCliente,correoCliente,direccionCliente,...resto } = req.body;
  
  if(!idTipoDocumento||!nombreCliente||!telefonoCliente||!correoCliente||!direccionCliente){
    return res.status(400).json({
      error:"Uno o mas campos vacios"
    });
  }
  

  if (!isEmail(correoCliente)) {
    return res.status(400).json({
      error: "El correo no tiene un formato válido",
    });
  }

  if (!cltId) {
    return res.json({ msj: 'El cliente no existe' });
  }
  
  const tDocumento = await TipoDocumento.findByPk(idTipoDocumento);
  if (!tDocumento) {
    return res.status(400).json({
    error: 'El tipo documento no existe'
    }); 
  }

  await cltId.update({ documentoCliente,idTipoDocumento,nombreCliente,telefonoCliente,correoCliente,direccionCliente, ...resto });

  res.json({
    msj: 'Cliente actualizado con exito',
    Cliente: cltId
  });
});


router.delete('/:id', validateJWT, validateRol, async (req, res) => {
  const { id } = req.params;
  const cltId = await Cliente.findByPk(id);

  if (!cltId) {
    return res.json({ msj: 'El usuario no existe o ya ha sido eliminado' });
  }

  await cltId.destroy();

  res.json({
    msj: 'Cliente eliminado con exito',
    Cliente: cltId
  });
});

module.exports = router