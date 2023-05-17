const Paquete = require('../models/paquete');
const ListaPaquete = require('../models/listaPaquete');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router()


router.get('/', validateJWT, async (req,res)=>{
  const lists = await ListaPaquete.findAll();

  res.json({
    Listas: lists
  });
});


router.get('/:id', validateJWT, async(req,res)=>{
  const { id } = req.params;
  const listPaquete = await ListaPaquete.findByPk(id)
  
  if(!listPaquete){
    return res.status(404).json({
      error:"No existe la lista de paquetes"
    });
  }

  res.json({
    msj: 'Informacion de usuario',
    Lista: listPaquete
  });
});


router.post('/', validateJWT, async (req,res)=>{
  const { idPaquete } = req.body;
  
  if(!idPaquete){
    return res.status(400).json({
      error:"Campos vacios"
    });
  }

  const paquete = await Paquete.findByPk(idPaquete);
  if (!paquete) {
    return res.status(400).json({
    error: 'El paquete no existe'
    }); 
  }
  const list = await ListaPaquete.create({idPaquete})

  res.json({
    msj: 'Lista creada exitosamente',
    Lista: list
  });
});


router.put('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const listId = await ListaPaquete.findByPk(id);
  const { idLista, idPaquete,...resto } = req.body;
  
  if(!idPaquete){
    return res.status(400).json({
      error:"Campos vacios"
    });
  }

  if (!listId) {
    return res.json({ msj: 'La lista no existe' });
  }
  
  const paq = await Paquete.findByPk(idPaquete);
  if (!paq) {
    return res.status(400).json({
    error: 'El paquete no existe'
    }); 
  }


  await listId.update({ idLista, idPaquete, ...resto });

  res.json({
    msj: 'Lista actualizada con exito',
    Lista: listId
  });
});

router.delete('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const listId = await ListaPaquete.findByPk(id);

  if (!listId) {
    return res.json({ msj: 'La lista no existe o ya ha sido eliminada' });
  }

  await listId.destroy();

  res.json({
    msj: 'Lista eliminada con exito',
    Lista: listId
  });
});
  

module.exports = router