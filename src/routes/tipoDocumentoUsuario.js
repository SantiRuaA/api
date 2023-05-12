const TipoDocumentoUsuario = require('../models/tipoDocumentoUsuario');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
    const tipoDocumentoUsuarios = await TipoDocumentoUsuario.findAll();

    res.json(tipoDocumentoUsuarios);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
    const { id } = req.params;
        const tipoDocumentoUsuario = await TipoDocumentoUsuario.findByPk(id)
    res.json(tipoDocumentoUsuario);
});

//Crear usuario
router.post('/', async (req,res)=>{
    const { idTipoDocumento, nombreTipo } = req.body;
    if(!nombreTipo || !idTipoDocumento){
        return res.status(400).json({
            error:"Uno o mas campos vacios"
        });
    }
    const tipoDocumentoUsuario = await TipoDocumentoUsuario.create({idTipoDocumento, nombreTipo})

    res.json(tipoDocumentoUsuario);
});

module.exports = router