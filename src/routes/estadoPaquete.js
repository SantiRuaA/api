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
    const { idEstado, estadoPaquete } = req.body;
    const estadoPaqExists = await EstadoPaquetes.findOne({ where: {estadoPaquete}})
    const estadoPaqId = await EstadoPaquetes.findByPk(idEstado)

    if (!estadoPaquete || !idEstado){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }
    if(estadoPaqId){
        return res.status(400).json({
            error:"Ya existe un estado con ese ID"
        });
    }
    if(estadoPaqExists){
        return res.status(400).json({
            error:"El estado del paquete ya existe"
        });
    }

    const estadoPaqC = await EstadoPaquetes.create({idEstado, estadoPaquete})

    res.json(estadoPaqC);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const estadoPaqId = await EstadoPaquetes.findByPk(id);
    const { idEstado, estadoPaquete, ...resto } = req.body;
  
    if (!estadoPaquete || !idEstado){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }

    if (!estadoPaqId) {
      return res.json({ msj: 'El estado del paquete no existe' });
    }

    if (id !== idEstado) {
        return res.status(400).json({
            error: "El ID en el enlace no coincide con el ID en el cuerpo"
        });
    }
  
    const estadoPaqExists = await EstadoPaquetes.findOne({ where: { estadoPaquete } });
  
    if (estadoPaqExists) {
      return res.status(400).json({
        error: 'El estado del paquete ya existe'
      });
    }
  
    await estadoPaqId.update({ idEstado, estadoPaquete, ...resto });
  
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