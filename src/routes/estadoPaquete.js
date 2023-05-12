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
        const estadoPaquetes = await EstadoPaquetes.findByPk(id)
    res.json(estadoPaquetes);
});

//Crear usuario
router.post('/', async (req,res)=>{
    const { idEstado,estadoPaquete } = req.body;
    if(!idEstado || !estadoPaquete){
        return res.status(400).json({
            error:"Uno o mas campos vacios"
        });
    }
    const estadoPaquetec = await EstadoPaquetes.create({idEstado,estadoPaquete})

    res.json(estadoPaquetec);
});

module.exports = router