const EstadoUsuario = require('../models/estadoUsuario');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router()


router.get('/', validateJWT, validateRol, async (req,res)=>{
    const estadoUsers = await EstadoUsuario.findAll();

    res.json({
        Estados: estadoUsers
    });
});


router.get('/:id', validateJWT, validateRol, async(req,res)=>{
    const { id } = req.params;
    const estadoUser = await EstadoUsuario.findByPk(id)

    if(!estadoUser){
        return res.status(404).json({
          error:"No existe el estado de usuario"
        });
    }

    res.json({
        msj: 'Informacion de estadoUsuario',
        Estado: estadoUser
    });
});


router.post('/', validateJWT, validateRol, async (req,res)=>{
    const { idEstado, estadoUsuario } = req.body;
    const estadoUserExists = await EstadoUsuario.findOne({ where: {estadoUsuario}})
    const estadoUserId = await EstadoUsuario.findByPk(idEstado)
    
    if (!estadoUsuario || !idEstado){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }
    if(estadoUserId){
        return res.status(400).json({
            error:"Ya existe un usuario con ese ID"
        });
    }

    if (!EstadoUsuario.rawAttributes.estadoUsuario.values.includes(estadoUsuario)) {
        return res.status(400).json({
            error:"Valor no permitido para el campo estado usuario"
        })
    }

    if(estadoUserExists){
        return res.status(400).json({
            error:"El estado del usuario ya existe"
        });
    }

    const estadoUserC = await EstadoUsuario.create({idEstado, estadoUsuario})

    res.json({
        msj: 'EstadoUsuario creado exitosamente',
        Estado: estadoUserC
    });
});


router.put('/:id', validateJWT, validateRol, async (req, res) => {
    const { id } = req.params;
    const estadoUserId = await EstadoUsuario.findByPk(id);
    const { idEstado, estadoUsuario, ...resto } = req.body;
  
    if (!estadoUsuario || !idEstado){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }

    if (!estadoUserId) {
      return res.json({ msj: 'El estado del usuario no existe' });
    }
  
    const estadoUserExists = await EstadoUsuario.findOne({ where: { estadoUsuario } });
    if (estadoUserExists) {
      return res.status(400).json({
        error: 'El estado del usuario ya existe'
      });
    }

    if (!EstadoUsuario.rawAttributes.estadoUsuario.values.includes(estadoUsuario)) {
        return res.status(400).json({
            error:"Valor no permitido para el campo estado usuario"
        })
    }
  
    await estadoUserId.update({ estadoUsuario, ...resto });
  
    res.json({
      msj: 'EstadoUsuario actualizado con exito',
      Estado: estadoUserId
    });
});


router.delete('/:id', validateJWT, validateRol, async (req, res) => {
    const { id } = req.params;
    const estadoUserId = await EstadoUsuario.findByPk(id);
  
    if (!estadoUserId) {
        return res.json({ 
            msj: 'El estado del usuario no existe o ya ha sido eliminado' 
        });
    }
  
    await estadoUserId.destroy();
  
    res.json({
      msj: 'EstadoUsuario eliminado con exito',
      Estado: estadoUserId
    });
});

module.exports = router