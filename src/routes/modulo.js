const Modulo = require('../models/modulo');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router()


router.get('/', validateJWT, validateRol, async (req,res)=>{
    const modulos = await Modulo.findAll();

    res.json({
        Modulos: modulos
    });
});


router.get('/:id', validateJWT, validateRol, async(req,res)=>{
    const { id } = req.params;
    const modulo = await Modulo.findByPk(id)
    
    if(!modulo){
        return res.json({
          error:"No existe el modulo"
        });
    }
    
    res.json({
        msj: 'Informacion de modulo',
        Modulo: modulo
    });
});


router.post("/", validateJWT, validateRol, async (req,res) => {
    const { modulo } = req.body;
    const moduloExists = await Modulo.findOne({ where: {modulo}})
    if (!modulo){
        return res.json({
            error:"Uno o más campos vacios"
        })
    }

    if (!Modulo.rawAttributes.modulo.values.includes(modulo)) {
        return res.json({
            error:"Valor no permitido para el campo modulo"
        })
    }

    if(moduloExists){
        return res.json({
            error:"El modulo ya existe"
        });
    }

    const moduloC = await Modulo.create({modulo});
    
    res.json({
        msj: 'Modulo creado exitosamente',
        Modulo: moduloC
    });
});

router.put('/:id', validateJWT, validateRol, async (req, res) => {
    const { id } = req.params;
    const moduloId = await Modulo.findByPk(id);
    const { modulo, ...resto } = req.body;
  
    if (!modulo){
        return res.json({
            error:"Uno o más campos vacios"
        })
    }

    if (!Modulo.rawAttributes.modulo.values.includes(modulo)) {
        return res.json({
            error:"Valor no permitido para el campo modulo"
        })
    }

    if (!moduloId) {
      return res.json({ msj: 'El modulo no existe' });
    }
  
    const moduloExists = await Modulo.findOne({ where: { modulo } });
  
    if (moduloExists) {
      return res.json({
        error: 'El modulo ya existe'
      });
    }
  
    await moduloId.update({ modulo, ...resto });
  
    res.json({
        msj: 'Modulo actualizado con exito',
        Modulo: moduloId
    });
});

router.delete('/:id', validateJWT, validateRol, async (req, res) => {
    const { id } = req.params;
    const moduloId = await Modulo.findByPk(id);
  
    if (!moduloId) {
        return res.json({ 
            msj: 'El modulo no existe o ya ha sido eliminado' 
        });
    }
  
    await moduloId.destroy();
  
    res.json({
      msj: 'Modulo eliminado con exito',
      Modulo: moduloId
    });
});

module.exports = router