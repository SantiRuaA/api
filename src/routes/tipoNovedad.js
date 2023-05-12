const TipoNovedad = require('../models/tipoNovedad');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
    const novedades = await TipoNovedad.findAll();

    res.json(novedades);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
    const { id } = req.params;
        const novedad = await TipoNovedad.findByPk(id)
    res.json(novedad);
});

//Crear usuario
router.post('/', async (req,res)=>{
    const { idTipoNovedad,tipoNovedad } = req.body;
    if(!idTipoNovedad || !tipoNovedad){
        return res.status(400).json({
            error:"Uno o mas campos vacios"
        });
    }
    const novedad = await TipoNovedad.create({idTipoNovedad,tipoNovedad})

    res.json(novedad);
});

module.exports = router