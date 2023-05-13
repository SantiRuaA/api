const Cliente = require('../models/cliente');
const TipoDocumento = require('../models/tipoDocumentoCliente');
const { isEmail } = require('validator');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
  const clientes = await Cliente.findAll();

  res.json(clientes);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const cliente = await Cliente.findByPk(id)
  if(!cliente){
    return res.status(404).json({
      error:"No existe el cliente"
    });
  }
  res.json(cliente);
});

//Crear usuario
router.post('/', async (req,res)=>{
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

  res.json(cliente);
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = await Cliente.findByPk(id);
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

  if (!userId) {
    return res.json({ msj: 'El cliente no existe' });
  }
  
  const tDocumento = await TipoDocumento.findByPk(idTipoDocumento);
  if (!tDocumento) {
    return res.status(400).json({
    error: 'El tipo documento no existe'
    }); 
  }


  await userId.update({ documentoCliente,idTipoDocumento,nombreCliente,telefonoCliente,correoCliente,direccionCliente, ...resto });

  res.json({
    msj: 'Cliente actualizado yujuu',
    usuario: userId
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = await Cliente.findByPk(id);

  if (!userId) {
    return res.json({ msj: 'El usuario no existe o ya ha sido eliminado' });
  }

  await userId.destroy();

  res.json({
    msj: 'Usuario eliminado con exito',
    usuario: userId
  });
});
  

module.exports = router