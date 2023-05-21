const Permiso = require('../models/permiso');
const Modulo = require('../models/modulo');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router()


router.get('/',async (req,res)=>{
  const permisos = await Permiso.findAll();

  res.json(permisos);
});


router.get('/:id',async(req,res)=>{
  const { id } = req.params;
  const permiso = await Permiso.findByPk(id)

  if(!permiso){
    return res.json({
      error:"No existe el permiso"
    });
  }

  res.json(permiso);
});


router.post('/',async (req,res)=>{
  const { nombrePermiso,idModulo } = req.body;
  const permi = await Permiso.findOne({ where: {nombrePermiso}})
  
  if(!nombrePermiso || !idModulo ){
    return res.json({
      status: "error",
      msj:"Uno o mas campos vacios"
    });
  }
  if (permi){
    return res.json({
      status: "error",
      msj:"El permiso ya existe"
    });
  }

  const modulo = await Modulo.findByPk(idModulo);
  if (!modulo) {
    return res.json({
    error: 'El idModulo proporcionado no es válido'
    });
  }

  const permiso = await Permiso.create({nombrePermiso,idModulo})

  res.json({
    status: "ok",
    msj: 'Permiso creado exitosamente'
  });
}),


router.put('/:id',async (req, res) => {
  const { id } = req.params;
  
  const { idPermiso, nombrePermiso,idModulo, ...resto } = req.body;
  const permiId = await Permiso.findByPk(idPermiso);
  
  if(!nombrePermiso || !idModulo ){
    return res.json({
      error:"Uno o mas campos vacios"
    });
  }

  if (!permiId) {
    return res.json({ msj: 'El permiso no existe' });
  }
  
  if (permiId.nombrePermiso !== nombrePermiso) {
    const permiExists = await Permiso.findOne({ where: { nombrePermiso } });
    if (permiExists) {
      return res.json({
        status : "error",
        msj: 'El permiso ya existe bro'
      });
    }
  }

  const modulo = await Modulo.findByPk(idModulo);
  if (!modulo) {
    return res.json({
      status: 'error',
      msj: 'El idModulo proporcionado no es válido'
    });
  }

  await permiId.update({ nombrePermiso, idModulo, ...resto });

  res.json({
    status: 'ok',
    msj: 'Permiso actualizado con exito',
  });
});

router.delete('/:id',async (req, res) => {
  const { id } = req.params;
  const permiId = await Permiso.findByPk(id);

  if (!permiId) {
    return res.json({ msj: 'El permiso no existe o ya ha sido eliminado' });
  }

  await permiId.destroy();

  res.json({
    status : 'ok',
    msj: 'Permiso eliminado con exito',
  });
});
  

module.exports = router