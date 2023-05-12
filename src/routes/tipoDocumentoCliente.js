const TipoDocumentoCliente = require('../models/tipoDocumentoCliente');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
    const tipoDocumentoClientes = await TipoDocumentoCliente.findAll();

    res.json(tipoDocumentoClientes);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
    const { id } = req.params;
        const tipoDocumentoCliente = await TipoDocumentoCliente.findByPk(id)
    res.json(tipoDocumentoCliente);
});

//Crear usuario
router.post('/', async (req,res)=>{
    const { idTipoDocumento, nombreTipo } = req.body;
    if(!nombreTipo || !idTipoDocumento){
        return res.status(400).json({
            error:"Uno o mas campos vacios"
        });
    }
    const tipoDocumentoCliente = await TipoDocumentoCliente.create({idTipoDocumento, nombreTipo})

    res.json(tipoDocumentoCliente);
});

module.exports = router