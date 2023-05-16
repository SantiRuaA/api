const Entrega = require('../models/entrega');
const Lista = require('../models/listaPaquete');

const router = require('express').Router()


router.get('/', async (req,res)=>{
  const entregas = await Entrega.findAll();

  res.json({
    Entregas: entregas
  });
});


router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const entrega = await Entrega.findByPk(id)
  
  if(!entrega){
    return res.status(404).json({
      error:"No existe la entrega"
    });
  }

  res.json({
    msj: 'Informacion de entrega',
    Entrega: entrega
  });
});


router.post('/', async (req,res)=>{
  const { firmaDestinatario,fechaEntrega,idLista } = req.body;
  //const ent = await Entrega.findOne({ where: {"Lo que no se vaya a repetir"}})
  
  if(!firmaDestinatario || !fechaEntrega || !idLista){
    return res.status(400).json({
        error:"Uno o mas campos vacios"
    });
  }
  
  /*if (ent){
    return res.status(400).json({
      error:"La entrega ya existe"
    });
  }*/

  const listId = await Lista.findByPk(idLista);
  if (!listId) {
    return res.status(400).json({
    error: 'La lista de paquetes no existe'
    }); 
  }


  const entrega = await Entrega.create({firmaDestinatario,fechaEntrega,idLista})

  res.json({
    msj: 'Entrega creada exitosamente',
    Entrega: entrega
  });
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const entId = await Entrega.findByPk(id);
  const { firmaDestinatario,fechaEntrega,idLista } = req.body;
  /* const ent = await Entrega.findOne({ where: {"Lo que no se vaya a repetir"}}) */
  
  if(!firmaDestinatario || !fechaEntrega || !idLista){
    return res.status(400).json({
        error:"Uno o mas campos vacios"
    });
  }
  
  if (!entId) {
    return res.status(404).json({
      error:"No existe la entrega"
    });
  }

 /*  if (ent){
    return res.status(400).json({
      error:"La entrega ya existe"
    });
  } */

  const listId = await Lista.findByPk(idLista);
  if (!listId) {
    return res.status(400).json({
    error: 'La lista de paquetes no existe'
    }); 
  }

  await entId.update({firmaDestinatario,fechaEntrega,idLista})

  res.json({
    msj: 'Entrega actualizada con exito',
    Entrega: entId
  });
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const entId = await Entrega.findByPk(id);

  if (!entId) {
    return res.json({ msj: 'La entrega no existe o ya ha sido eliminado' });
  }

  await entId.destroy();

  res.json({
    msj: 'Entrega eliminada con exito',
    Entrega: entId
  });
});

module.exports = router