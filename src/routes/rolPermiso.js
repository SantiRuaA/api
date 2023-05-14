const RolPermiso = require('../models/rolPermiso');
const Rol = require('../models/Rol');
const Permiso = require('../models/permiso');

const router = require('express').Router()


router.get("/",async(req,res) => {
    const rolesPermiso = await RolPermiso.findAll()

    res.json({
        RolesxPermisos: rolesPermiso
    });
});


router.get("/:id", async(req,res) => {
    const { id } = req.params
    const rolPermiso = await RolPermiso.findByPk(id)

    if(!rolPermiso){
        return res.status(404).json({
          error:"No existe el rolPermiso"
        });
    }

    res.json({
        msj: 'Informacion de RolxPermiso',
        RolxPermiso: rolPermiso
      });
});


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
    
    res.json({
        msj: 'RolxPermiso creado exitosamente',
        RolxPermiso: rolPermiso
      });
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
      msj: 'RolxPermiso actualizado con exito',
      RolxPermiso: rolPermisoId
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
      msj: 'RolxPermiso eliminado con exito',
      RolxPermiso: rolPermisoId
    });
});

module.exports = router;