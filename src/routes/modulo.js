const Modulo = require('../models/modulo');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router()


router.get('/',async (req,res)=>{
    const modulos = await Modulo.findAll();

    res.json(modulos);
});


router.get('/:id',async(req,res)=>{
    const { id } = req.params;
    const modulo = await Modulo.findByPk(id)
    
    if(!modulo){
        return res.json({
          error:"No existe el modulo"
        });
    }
    
    res.json(modulo);
});


router.post("/",async (req,res) => {
    const { modulo } = req.body;
    const moduloExists = await Modulo.findOne({ where: {modulo}})
    if (!modulo){
        return res.json({
            status: "error",
            msj:"Uno o más campos vacios"
        })
    }

    if (!Modulo.rawAttributes.modulo.values.includes(modulo)) {
        return res.json({
            status: "error",
            msj:"Valor no permitido para el campo modulo"
        })
    }

    if(moduloExists){
        return res.json({
            status : "error",
            msj:"El modulo ya existe"
        });
    }

    const moduloC = await Modulo.create({modulo});
    
    res.json({
        status: "ok",
        msj: 'Modulo creado exitosamente',
    });
});

router.put('/:id',async (req, res) => {
    const { id } = req.params;
   
    const { idModulo, modulo, ...resto } = req.body;
    const moduloId = await Modulo.findByPk(idModulo);
  
    if (!modulo){
        return res.json({
            status: "error",
            msj:"Uno o más campos vacios"
        })
    }

    if (!Modulo.rawAttributes.modulo.values.includes(modulo)) {
        return res.json({
            status : "error",
            msj:"Valor no permitido para el campo modulo"
        })
    }

    if (!moduloId) {
      return res.json({ msj: 'El modulo no existe' });
    }

    if (moduloId.modulo !== modulo) {//**********COLOCAR ESTA VALIDACION EN TODOS LOS PUT******************
        const moduloExists = await Modulo.findOne({ where: { modulo } }); 
        if (moduloExists) {
            return res.json({
            status: 'error',
            msj: 'El modulo ya existe'
            });
        }
    }
    
  
    await moduloId.update({ modulo, ...resto });
  
    res.json({
        status: "ok",
        msj: 'Modulo actualizado con exito'
    });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const moduloId = await Modulo.findByPk(id);
  
    if (!moduloId) {
        return res.json({ 
            msj: 'El modulo no existe o ya ha sido eliminado' 
        });
    }
  
    await moduloId.destroy();
  
    res.json({
        status: "ok",
      msj: 'Modulo eliminado con exito'
    });
});

module.exports = router