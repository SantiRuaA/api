const Cliente = require('../models/cliente');
const TipoDocumento = require('../models/tipoDocumentoCliente');
const Paquete = require('../models/paquete');
const { isEmail } = require('validator');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router()


router.get('/', async (req, res) => {
  const clientes = await Cliente.findAll();

  if (clientes.length === 0) {
    return res.json({
      status: "error",
      msj: "No hay clientes registrados"
    });
  }

  res.json(clientes);
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const cliente = await Cliente.findByPk(id)

  if (!cliente) {
    return res.json({
      error: "No existe el cliente"
    });
  }

  res.json(cliente);
});


router.post('/', async (req, res) => {
  const { documentoCliente, idTipoDocumento, nombreCliente, telefonoCliente, correoCliente, direccionCliente } = req.body;
  const cliente = await Cliente.findOne({ where: { correoCliente } })

  if (!documentoCliente || !idTipoDocumento || !nombreCliente || !telefonoCliente || !correoCliente || !direccionCliente) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios"
    });
  }

  if (isNaN(documentoCliente) || isNaN(telefonoCliente)) {
    return res.json({
      status: "error",
      msj: "El documento y el telefono deben ser un número",
    });
  }

  if (cliente) {
    return res.json({
      status: "error",
      msj: "El correo ya existe"
    });
  }

  const clienteId = await Cliente.findByPk(documentoCliente)
  if (clienteId) {
    return res.json({
      status: "error",
      msj: "Ya existe un cliente con ese documento"
    });
  }

  const emailRegex = new RegExp('^[\\w.%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');

  if (!emailRegex.test(correoCliente)) {
    return res.json({
      status: "error",
      msj: "El correo no tiene un formato válido",
    });
  }


  const tDocumento = await TipoDocumento.findByPk(idTipoDocumento);
  if (!tDocumento) {
    return res.json({
      status: "error",
      msj: 'El tipo documento no existe'
    });
  }

  const clienteC = await Cliente.create({ documentoCliente, idTipoDocumento, nombreCliente, telefonoCliente, correoCliente, direccionCliente })

  res.json({
    status: "ok",
    msj: 'Cliente creado exitosamente'
  });
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { documentoCliente, idTipoDocumento, nombreCliente, telefonoCliente, correoCliente, direccionCliente, ...resto } = req.body;
  const cltId = await Cliente.findByPk(documentoCliente);

  if (!idTipoDocumento || !nombreCliente || !telefonoCliente || !correoCliente || !direccionCliente) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios"
    });
  }

  if (documentoCliente !== cltId.documentoCliente) {
    return res.json({
      status: "error",
      msj: "No puedes cambiar el documento de un cliente"
    });
  }

  if (isNaN(documentoCliente) || isNaN(telefonoCliente)) {
    return res.json({
      status: "error",
      msj: "El documento y el telefono deben ser un número",
    });
  }

  const emailRegex = new RegExp('^[\\w.%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');

  if (!emailRegex.test(correoCliente)) {
    return res.json({
      status: "error",
      msj: "El correo no tiene un formato válido",
    });
  }

  if (correoCliente !== cltId.correoCliente) {
    const emailExists = await Cliente.findOne({ where: { correoCliente } });
    if (emailExists) {
      return res.json({
        status: "error",
        msj: 'El email ya lo tiene otro cliente'
      });
    }
  }

  if (!cltId) {
    return res.json({
      status: "error",
      msj: 'El cliente no existe'
    });
  }

  const tDocumento = await TipoDocumento.findByPk(idTipoDocumento);
  if (!tDocumento) {
    return res.json({
      error: 'El tipo documento no existe'
    });
  }

  await cltId.update({ documentoCliente, idTipoDocumento, nombreCliente, telefonoCliente, correoCliente, direccionCliente, ...resto });

  res.json({
    status: "ok",
    msj: 'Cliente actualizado con exito'
  });
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const cltId = await Cliente.findByPk(id);

  if (!cltId) {
    return res.json({ msj: 'El cliente no existe o ya ha sido eliminado' });
  }

  const paqAsociados = await Paquete.findAll({ where: { documentoRemitente: cltId.documentoCliente } });

  if (paqAsociados.length > 0) { //ESTA VUELTA ES PARA VER SI EL CLIENTE TIENE PAQUETES ASOCIADOS
    return res.json({
      status: 'error',
      msj: 'No se puede eliminar el cliente porque tiene paquetes asociados'
    });
  }

  await cltId.destroy();

  res.json({
    status: 'ok',
    msj: 'Cliente eliminado con exito'
  });
});

module.exports = router