const Modulo = require('../models/modulo');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
    const modulos = await Modulo.findAll();

    res.json(modulos);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
    const { id } = req.params;
        const modulo = await Modulo.findByPk(id)
    res.json(modulo);
});

//Crear usuario
router.post('/', async (req,res)=>{
    const { idModulo,modulo } = req.body;
    if(!idModulo || !modulo){
        return res.status(400).json({
            error:"Uno o mas campos vacios"
        });
    }
    const moduloC = await Modulo.create({idModulo,modulo})

    res.json(moduloC);
});

module.exports = router