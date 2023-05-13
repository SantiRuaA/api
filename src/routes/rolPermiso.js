const RolPermiso = require('../models/rolPermiso');
const Rol = require('../models/rol');
const Permiso = require('../models/permiso');

const router = require('express').Router()

//Obtener todos los roles permiso
router.get("/",async(req,res) => {
    const rolesPermiso = await RolPermiso.findAll()

    res.json(rolesPermiso);
});

//Un solo rol permiso
router.get("/:id", async(req,res) => {
    const { id } = req.params
    const rolPermiso = await RolPermiso.findByPk(id)
    res.json(rolPermiso);
});

//Crear un rol permiso
router.post("/", async (req,res) => {
    const { fechaCreacion, idRol, idPermiso } = req.body;
    if (!fechaCreacion || !idRol || !idPermiso){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }

    const rol = await Rol.findByPk(idRol);
    if (!rol) {
        return res.status(400).json({
        error: 'El idRol proporcionado no es válido'
        });
    }

    const permiso = await Permiso.findByPk(idPermiso);
    if (!permiso) {
        return res.status(400).json({
        error: 'El idPermiso proporcionado no es válido'
        });
    }

    const rolPermiso = await RolPermiso.create({fechaCreacion, idRol, idPermiso});
    res.json(rolPermiso);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const rolPermisoId = await RolPermiso.findByPk(id);
    const { fechaCreacion, idRol, idPermiso } = req.body;
  
    if (!fechaCreacion || !idRol || !idPermiso){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }

    if (!rolPermisoId) {
        return res.json({ msj: 'El rol permiso no existe' });
    }

    const rol = await Rol.findByPk(idRol);
    if (!rol) {
        return res.status(400).json({
        error: 'El idRol proporcionado no es válido'
        });
    }

    const permiso = await Permiso.findByPk(idPermiso);
    if (!permiso) {
        return res.status(400).json({
        error: 'El idPermiso proporcionado no es válido'
        });
    }
  
  
    await rolPermisoId.update({ fechaCreacion, idRol, idPermiso });
  
    res.json({
      msj: 'Rol actualizado yujuu',
      rol: rolPermisoId
    });
    
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const rolPermisoId = await RolPermiso.findByPk(id);
  
    if (!rolPermisoId) {
        return res.json({ 
            msj: 'El rol permiso no existe o ya ha sido eliminado' 
        });
    }
  
    await rolPermisoId.destroy();
  
    res.json({
      msj: 'Rol eliminado con exito',
      rol: rolPermisoId
    });
});

module.exports = router;