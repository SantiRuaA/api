const EstadoPaquetes = require('../models/estadoPaquete');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
    const estadoPaquetes = await EstadoPaquetes.findAll();

    res.json(estadoPaquetes);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
    const { id } = req.params;
    const estadoPaquete = await EstadoPaquetes.findByPk(id)
    res.json(estadoPaquete);
});

//Crear usuario
router.post('/', async (req,res)=>{
    const { estadoPaquete } = req.body;
    const estadoPaqExists = await EstadoPaquetes.findOne({ where: {estadoPaquete}})
    if (!estadoPaquete){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }

    if(estadoPaqExists){
        return res.status(400).json({
            error:"El estado del paquete ya existe"
        });
    }

    const estadoPaqC = await EstadoPaquetes.create({estadoPaquete})

    res.json(estadoPaqC);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const estadoPaqId = await EstadoPaquetes.findByPk(id);
    const { estadoPaquete, ...resto } = req.body;
  
    if (!estadoPaquete){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }

    if (!estadoPaqId) {
      return res.json({ msj: 'El estado del paquete no existe' });
    }
  
    const estadoPaqExists = await EstadoPaquetes.findOne({ where: { estadoPaquete } });
  
    if (estadoPaqExists) {
      return res.status(400).json({
        error: 'El estado del paquete ya existe'
      });
    }
  
    await estadoPaqId.update({ estadoPaquete, ...resto });
  
    res.json({
      msj: 'Estado del paquete actualizado yujuu',
      estadoPaq: estadoPaqId
    });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const estadoPaqId = await EstadoPaquetes.findByPk(id);
  
    if (!estadoPaqId) {
        return res.json({ 
            msj: 'El estado del paquete no existe o ya ha sido eliminado' 
        });
    }
  
    await estadoPaqId.destroy();
  
    res.json({
      msj: 'Estado del paquete eliminado con exito',
      estadoPaq: estadoPaqId
    });
});

module.exports = router