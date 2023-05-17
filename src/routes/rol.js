const Rol = require('../models/rol');
const validateRol = require('../middlewares/validateRol');
const validateJWT = require('../middlewares/tokenValidation');

const router = require('express').Router()

router.get("/", validateJWT, validateRol, async(req,res) => {
    const roles = await Rol.findAll()

    res.json({
        Roles: roles
    });
});


router.get("/:id", validateRol, validateJWT, async(req,res) => {
    const { id } = req.params
    const rol = await Rol.findByPk(id)

    if(!rol){
        return res.status(404).json({
          error:"No existe el rol"
        });
    }

    res.json({
        msj: 'Informacion de rol',
        Rol: rol
    });
});


router.post("/", validateRol, validateJWT, async (req,res) => {
    const { idRol, nombreRol, descripcionRol } = req.body;
    const rolExists = await Rol.findOne({ where: {nombreRol}})
    if (!nombreRol || !idRol){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }

    if(rolExists){
        return res.status(400).json({
            error:"El rol ya existe"
        });
    }

    const rolId = await Rol.findByPk(idRol)
    if(rolId){
        return res.status(400).json({
          error:"Ya existe un rol con ese ID"
        });
    }

    const rol = await Rol.create({idRol, nombreRol, descripcionRol});
    
    res.json({
        msj: 'Rol creado exitosamente',
        Rol: rol
    });
});


router.put('/:id', validateRol, validateJWT, async (req, res) => {
    const { id } = req.params;
    const rolId = await Rol.findByPk(id);
    const { nombreRol, ...resto } = req.body;
  
    if (!nombreRol){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }

    if (!rolId) {
        return res.json({ msj: 'El rol no existe' });
    }
  
    const rolExists = await Rol.findOne({ where: { nombreRol } });
  
    if (rolExists) {
        return res.status(400).json({
        error: 'El rol ya existe'
        });
    }
  
    await rolId.update({ nombreRol, ...resto });
  
    res.json({
      msj: 'Rol actualizado con exito',
      Rol: rolId
    });
});

router.delete('/:id', validateRol, validateJWT, async (req, res) => {
    const { id } = req.params;
    const rolId = await Rol.findByPk(id);
  
    if (!rolId) {
        return res.json({ 
            msj: 'El rol no existe o ya ha sido eliminado' 
        });
    }
  
    await rolId.destroy();
  
    res.json({
      msj: 'Rol eliminado con exito',
      Rol: rolId
    });
});

module.exports = router;