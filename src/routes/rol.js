const Rol = require('../models/rol');
const validateRol = require('../middlewares/validateRol');
const validateJWT = require('../middlewares/tokenValidation');

const router = require('express').Router()

router.get('/lastId', async (req, res) => {
    const lastRol = await Rol.findOne({
      attributes: ['idRol'],
      order: [['idRol', 'DESC']]
    });
  
    if (!lastRol) {
      return res.json({
        error: 'No se encontraron roles'
      });
    }
  
    res.json(lastRol.idRol);
  });

router.get("/", async(req,res) => {
    const roles = await Rol.findAll()

    res.json(roles);
});


router.get("/:id",  async(req,res) => {
    const { id } = req.params
    const rol = await Rol.findByPk(id)

    res.json(rol);
});


router.post("/", async (req,res) => {
    const { nombreRol, descripcionRol } = req.body;
    
    if (!nombreRol){
        return res.json({
            status: "error",
            msj:"Un campo vacio"
        })
    }

    /* const rolId = await Rol.findByPk(idRol)
    if(rolId){
        return res.json({
            status: "error",
            msj:"Ya existe un rol con ese ID"
        });
    } */

    const rolExists = await Rol.findOne({ where: {nombreRol}})
    if(rolExists){
        return res.json({
            status: "error",
            msj:"El rol ya existe"
        });
    }

    /* if (!Rol.rawAttributes.nombreRol.values.includes(nombreRol)) {
        return res.json({
            status: "error",
            msj:"Valor no permitido para el campo rol"
        })
    } */

    const rol = await Rol.create({nombreRol, descripcionRol});
    
    res.json({
        status: 'ok',
        msj: 'Rol creado exitosamente',
        id: rol.id
    });
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombreRol, ...resto } = req.body;
    const rolId = await Rol.findByPk(id);
  
    if (!nombreRol){
        return res.json({
            status: "error",
            msj:"Uno o más campos vacios"
        })
    }

    if (!rolId) {
        return res.json({
            status: 'error', 
            msj: 'El rol no existe' 
        });
    }

    /* if (!Rol.rawAttributes.nombreRol.values.includes(nombreRol)) {
        return res.json({
            status: "error",
            msj:"Valor no permitido para el campo rol"
        })
    } */
    
    if (rolId.nombreRol !== nombreRol) {
        const rolExists = await Rol.findOne({ where: { nombreRol } });
        if (rolExists) {
            return res.json({
                status: 'error',
                msj: 'El rol ya existe'
            });
        }
    }
  
    await rolId.update({ nombreRol, ...resto });
  
    res.json({
      status: 'ok',
      rolId
    });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const rolId = await Rol.findByPk(id);
  
    if (!rolId) {
        return res.json({ 
            msj: 'El rol no existe o ya ha sido eliminado' 
        });
    }
  
    await rolId.destroy();
  
    res.json({
      status: 'ok',
      rolId});
});


// Nuevo endpoint para obtener el último ID de rol creado

  
  
  

module.exports = router;