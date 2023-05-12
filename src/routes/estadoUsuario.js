const EstadoUsuario = require('../models/estadoUsuario');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
    const estadoUsuarios = await EstadoUsuario.findAll();

    res.json(estadoUsuarios);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
    const { id } = req.params;
        const estadoUsuarios = await EstadoUsuario.findByPk(id)
    res.json(estadoUsuarios);
});

//Crear usuario
router.post('/', async (req,res)=>{
    const { idEstado,estadoUsuario } = req.body;
    if(!idEstado || !estadoUsuario){
        return res.status(400).json({
            error:"Uno o mas campos vacios"
        });
    }
    const estadoUsuarioc = await EstadoUsuario.create({idEstado,estadoUsuario})

    res.json(estadoUsuarioc);
});

module.exports = router