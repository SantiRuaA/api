const TipoNovedad = require('../models/tipoNovedad');

const router = require('express').Router()


router.get('/', async (req, res) => {
  const novedades = await TipoNovedad.findAll();

  res.json(novedades);
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const novedad = await TipoNovedad.findByPk(id)

  if (!novedad) {
    return res.json({
      error: "No existe la novedad"
    });
  }

  res.json(novedad);
});


router.post('/', async (req, res) => {
  const { idTipoNovedad, tipoNovedad } = req.body;
  const tipo = await TipoNovedad.findOne({ where: { tipoNovedad } })
  const tipoId = await TipoNovedad.findByPk(idTipoNovedad)
  if (!tipoNovedad || !idTipoNovedad) {
    return res.json({
      error: "Uno o mas campos vacios"
    });
  }

  if (tipo) {
    return res.json({
      error: "El tipo de novedad ya existe"
    });
  }

  if (!TipoNovedad.rawAttributes.tipoNovedad.values.includes(tipoNovedad)) {
    return res.json({
      error: "Valor no permitido para el campo tipo novedad"
    })
  }

  if (tipoId) {
    return res.json({
      error: "Ya existe una novedad con ese ID"
    });
  }

  const novedad = await TipoNovedad.create({ idTipoNovedad, tipoNovedad })

  res.json({
    status: 'ok',
    msj: 'Tipo de novedad creada exitosamente',
  });
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoNovedad.findByPk(id);
  const { idTipoNovedad, tipoNovedad, ...resto } = req.body;

  if (!tipoNovedad || !idTipoNovedad) {
    return res.json({
      error: "Uno o mas campos vacios"
    });
  }

  if (!tipoId) {
    return res.json({ msj: 'El tipo de novedad no existe' });
  }

  /* if (id !== idTipoNovedad) {
      return res.json({
        error: "El ID en el enlace no coincide con el ID en el cuerpo"
      });
  } */

  if (!TipoNovedad.rawAttributes.tipoNovedad.values.includes(tipoNovedad)) {
    return res.json({
      error: "Valor no permitido para el campo tipo novedad"
    })
  }

  const tipoDocId = await TipoNovedad.findByPk(idTipoNovedad)
  if (tipoDocId) {
    return res.json({
      error: "Ya existe una novedad con ese ID"
    });
  }

  const tipoExists = await TipoNovedad.findOne({ where: { tipoNovedad } });
  if (tipoExists) {
    return res.json({
      error: 'El tipo de novedad ya existe'
    });
  }

  await tipoId.update({ tipoNovedad, ...resto });

  res.json({
    status: 'ok',
    msj: 'Tipo de novedad actualizada con exito',
  });
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoNovedad.findByPk(id);

  if (!tipoId) {
    return res.json({ msj: 'El tipo de novedad no existe o ya ha sido eliminada' });
  }

  await tipoId.destroy();

  res.json({
    status: 'ok',
    msj: 'Tipo de novedad eliminada con exito',
  });
});

module.exports = router