const RolPermiso = require('../models/rolPermiso');
const Rol = require('../models/Rol');
const Permiso = require('../models/permiso');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router()


router.get("/", async(req,res) => {
    const rolesPermiso = await RolPermiso.findAll()

    res.json({
        RolesxPermisos: rolesPermiso
    });
});


router.get("/:id", async(req,res) => {
    const { id } = req.params
    const rolPermiso = await RolPermiso.findByPk(id)

    if(!rolPermiso){
        return res.json({
          error:"No existe el rolPermiso"
        });
    }

    res.json({
        msj: 'Informacion de RolxPermiso',
        RolxPermiso: rolPermiso
      });
});


router.post("/", async (req,res) => {
    const { idRol, idPermiso } = req.body;
    if ( !idRol || !idPermiso){
        return res.json({
            status: "error",
            msj:"Uno o más campos vacios"
        })
    }

    const rol = await Rol.findByPk(idRol);
    if (!rol) {
        return res.json({
            status: "error",
            msj: 'El idRol proporcionado no es válido'
        });
    }

    const permiso = await Permiso.findByPk(idPermiso);
    if (!permiso) {
        return res.json({
            status: "error",
            msj: 'El idPermiso proporcionado no es válido'
        });
    }

    const rolPermiso = await RolPermiso.create({idRol, idPermiso});
    
    res.json({
        status: "ok",
        msj: 'RolxPermiso creado exitosamente',
      });
});

router.put('/:id',  async (req, res) => {
    const { id } = req.params;
    const rolPermisoId = await RolPermiso.findByPk(id);
    const { idRol, idPermiso } = req.body;
  
    if (!idRol || !idPermiso){
        return res.json({
            error:"Uno o más campos vacios"
        })
    }

    if (!rolPermisoId) {
        return res.json({ msj: 'El rol permiso no existe' });
    }

    const rol = await Rol.findByPk(idRol);
    if (!rol) {
        return res.json({
        error: 'El idRol proporcionado no es válido'
        });
    }

    const permiso = await Permiso.findByPk(idPermiso);
    if (!permiso) {
        return res.json({
        error: 'El idPermiso proporcionado no es válido'
        });
    }
  
  
    await rolPermisoId.update({ idRol, idPermiso });
  
    res.json({
        status: "ok",
        msj: 'RolxPermiso actualizado con exito',
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