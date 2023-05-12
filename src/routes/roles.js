const Rol = require('../models/Rol');

const router = require('express').Router()

//Obtener todos los roles
router.get("/",async(req,res) => {
        const roles = await Rol.findAll()

    res.json([roles]);
});

//Un solo rol
router.get("/:id", async(req,res) => {
    const { id } = req.params
     const tiporol = await Rol.findByPk(id)
    res.json(tiporol);
});

//Crear un rol
router.post("/", async (req,res) => {
    const { rol,descripcion } = req.body;
    
    if (!rol || !descripcion){
        return res.status(400).json({
            error:"uno o más campos vacios"
        })
    }
    const tiporol = await Rol.create({rol,descripcion});
    res.json(tiporol);
});


module.exports = router;