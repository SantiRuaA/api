const EstadoUsuario = require('../models/estadoUsuario');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
    const estadoUsuarios = await EstadoUsuario.findAll();

    res.json(estadoUsuarios);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
    const { id } = req.params;
    const estadoUsuario = await EstadoUsuario.findByPk(id)
    res.json(estadoUsuario);
});

//Crear usuario
router.post('/', async (req,res)=>{
    const { estadoUsuario } = req.body;
    const estadoUserExists = await EstadoUsuario.findOne({ where: {estadoUsuario}})
    if (!estadoUsuario){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }

    if(estadoUserExists){
        return res.status(400).json({
            error:"El estado del usuario ya existe"
        });
    }

    const estadoUserC = await EstadoUsuario.create({estadoUsuario})

    res.json(estadoUserC);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const estadoUserId = await EstadoUsuario.findByPk(id);
    const { estadoUsuario, ...resto } = req.body;
  
    if (!estadoUsuario){
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
  
    await estadoUserId.update({ estadoUsuario, ...resto });
  
    res.json({
      msj: 'Estado del usuario actualizado yujuu',
      estadoUser: estadoUserId
    });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const estadoUserId = await EstadoUsuario.findByPk(id);
  
    if (!estadoUserId) {
        return res.json({ 
            msj: 'El estado del usuario no existe o ya ha sido eliminado' 
        });
    }
  
    await estadoUserId.destroy();
  
    res.json({
      msj: 'Estado del usuario eliminado con exito',
      estadoUser: estadoUserId
    });
});

module.exports = router