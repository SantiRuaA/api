const Novedad = require('../models/novedad');
const TipoNovedad = require('../models/tipoNovedad');
const Entrega = require('../models/entrega');

const router = require('express').Router()

router.get('/', async (req, res) => {
  const novedades = await Novedad.findAll();

  if (novedades.length === 0) {
    return res.json({
      status: "error",
      msj: "No hay novedades registradas"
    });
  }

  res.json(novedades);
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const novedad = await Novedad.findByPk(id)

  if (!novedad) {
    return res.json({
      error: "No existe la novedad"
    });
  }

  res.json(novedad);
});


router.post('/', async (req, res) => {
  const { descripcionNovedad, idTipoNovedad, idEntrega } = req.body;

  if (!descripcionNovedad || !idTipoNovedad || !idEntrega) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios"
    });
  }

  const tipo = await TipoNovedad.findByPk(idTipoNovedad);
  if (!tipo) {
    return res.json({
      error: 'El tipo de novedad no existe'
    });
  }

  const entrega = await Entrega.findByPk(idEntrega);
  if (!entrega) {
    return res.json({
      error: 'La entrega no existe'
    });
  }

  const novedad = await Novedad.create({ descripcionNovedad, idTipoNovedad, idEntrega })

  res.json({
    status: 'ok',
    msj: 'Novedad creada exitosamente',
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const novId = await Novedad.findByPk(id);

  if (!novId) {
    return res.json({ msj: 'La novedad no existe o ya ha sido eliminada' });
  }

  await novId.destroy();

  res.json({
    msj: 'Novedad eliminada con exito',
    Novedad: novId
  });
});

module.exports = router