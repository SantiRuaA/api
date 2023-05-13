const Modulo = require('../models/modulo');

const router = require('express').Router()

//obtener todos los usuarios
router.get('/', async (req,res)=>{
    const modulos = await Modulo.findAll();

    res.json(modulos);
});

//Obtener un solo usuario
router.get('/:id',async(req,res)=>{
    const { id } = req.params;
        const modulo = await Modulo.findByPk(id)
    res.json(modulo);
});

//Crear usuario
router.post("/", async (req,res) => {
    const { modulo } = req.body;
    const moduloExists = await Modulo.findOne({ where: {modulo}})
    if (!modulo){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }

    if(moduloExists){
        return res.status(400).json({
            error:"El modulo ya existe"
        });
    }

    const moduloC = await Modulo.create({modulo});
    res.json(moduloC);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const moduloId = await Modulo.findByPk(id);
    const { modulo, ...resto } = req.body;
  
    if (!modulo){
        return res.status(400).json({
            error:"Uno o más campos vacios"
        })
    }

    if (!moduloId) {
      return res.json({ msj: 'El modulo no existe' });
    }
  
    const moduloExists = await Modulo.findOne({ where: { modulo } });
  
    if (moduloExists) {
      return res.status(400).json({
        error: 'El modulo ya existe'
      });
    }
  
    await moduloId.update({ modulo, ...resto });
  
    res.json({
      msj: 'Modulo actualizado yujuu',
      modulo: moduloId
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
      msj: 'Modulo eliminado con exito',
      modulo: moduloId
    });
});

module.exports = router