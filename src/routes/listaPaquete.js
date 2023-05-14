const Paquete = require('../models/paquete');
const ListaPaquete = require('../models/listaPaquete');
const { isEmail } = require('validator');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
  const paquetes = await ListaPaquete.findAll();

  res.json(paquetes);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const paquete = await ListaPaquete.findByPk(id)
  if(!paquete){
    return res.status(404).json({
      error:"No existe el paquete"
    });
  }
  res.json(cliente);
});

//Crear usuario
router.post('/', async (req,res)=>{
  const { idLista, idPaquete } = req.body;
  
  if(!idPaquete){
    return res.status(400).json({
        error:"Campo vacios"
    });
  }

  const paquete = await Paquete.findByPk(idPaquete);
  if (!paquete) {
    return res.status(400).json({
    error: 'El paquete no existe'
    }); 
  }
  const save = await ListaPaquete.create({idLista, idPaquete})

  res.json(save);
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