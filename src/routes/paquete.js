const Paquete = require('../models/paquete');
const Cliente = require('../models/cliente');
const Usuario = require('../models/Usuario');
const EstadoPaquete = require('../models/estadoPaquete');
const TamanoPaquete = require('../models/tamanoPaquete');
const TipoPaquete = require('../models/tipoPaquete');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const paquetes = await Paquete.findAll();

  if (paquetes.length < 1) {
    return res.json({
      status: 'error',
      msj: 'No hay paquetes registrados',
    });
  }

  res.json(paquetes);
});

router.get('/:documentoCliente/data', async (req, res) => {
  const { documentoCliente } = req.params;

  try {
    const cliente = await Cliente.findOne({ where: { documentoCliente } });


    if (!cliente) {
      return res.json({
        error: 'El cliente no existe',
      });
    }

    res.json({
      documento: cliente.documentoCliente,
      nombre: cliente.nombreCliente,
      direccion: cliente.direccionCliente,
      telefono: cliente.telefonoCliente,
      correo: cliente.correoCliente,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/:idCliente/nombre', async (req, res) => {
  const { idCliente } = req.params;

  try {
    const cliente = await Cliente.findByPk(idCliente);


    if (!cliente) {
      return res.json({
        error: 'El cliente no existe',
      });
    }

    res.json({
      nombre: cliente.nombreCliente,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const paquete = await Paquete.findByPk(id);

  if (!paquete) {
    return res.json({
      error: 'No existe el paquete',
    });
  }

  res.json(paquete);
});

router.post('/', async (req, res) => {
  const { codigoQrPaquete, pesoPaquete, unidadesPaquete, contenidoPaquete, documentoDestinatario, nombreDestinatario, correoDestinatario, telefonoDestinatario, fechaAproxEntrega, idUsuario, documentoRemitente, idEstado, idTamano, idTipo } = req.body;
  // const paq = await Paquete.findOne({ where: { codigoQrPaquete } });

  if (!pesoPaquete || !unidadesPaquete || !contenidoPaquete || !documentoDestinatario || !nombreDestinatario || !correoDestinatario || !telefonoDestinatario || !fechaAproxEntrega || !documentoRemitente || !idTipo) {
    return res.json({
      status: 'error',
      msj: 'Uno o más campos vacíos',
    });
  }

  if (isNaN(pesoPaquete) || isNaN(unidadesPaquete) || isNaN(telefonoDestinatario)) {
    return res.json({
      status: "error",
      msj: "El campo peso deben ser numerico",
    });
  }
  //nou

  /* if (documentoDestinatario === documentoRemitente) {
    return res.json({
      status: 'error',
      msj: 'El destinatario y el remitente no pueden ser iguales',
    });
  } */

  const userRemi = await Cliente.findOne({ where: { documentoCliente: documentoRemitente } });
  if (!userRemi) {
    return res.json({
      status: 'error',
      msj: 'El documento del cliente no existe',
    });
  }

  /*const clDoc = await Cliente.findByPk(documentoCliente);
  if (!clDoc) {
    return res.json({
      status: 'error',
      msj: 'El documento del cliente no existe',
    });
  }*/

  const estado = await EstadoPaquete.findByPk(idEstado);
  if (!estado) {
    return res.json({
      status: 'error',
      msj: 'El estado no existe',
    });
  }

  /* const tamano = await TamanoPaquete.findByPk(idTamano);
  if (!tamano) {
    return res.json({
      status: 'error',
      msj: 'El tamaño no existe',
    });
  } */

  const tipo = await TipoPaquete.findByPk(idTipo);
  if (!tipo) {
    return res.json({
      status: 'error',
      msj: 'El tipo no existe',
    });
  }

  const paquete = await Paquete.create({ codigoQrPaquete, pesoPaquete, unidadesPaquete, contenidoPaquete, documentoDestinatario, nombreDestinatario, correoDestinatario, telefonoDestinatario, fechaAproxEntrega, idUsuario, documentoRemitente, idEstado, idTamano, idTipo });

  res.json({
    status: 'ok',
    msj: 'Paquete creado exitosamente',
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { idPaquete, codigoQrPaquete, pesoPaquete, unidadesPaquete, contenidoPaquete, documentoDestinatario, nombreDestinatario, correoDestinatario, telefonoDestinatario, fechaAproxEntrega, idUsuario, documentoRemitente, idEstado, idTamano, idTipo } = req.body;
  const paqId = await Paquete.findByPk(idPaquete);
  // const paq = await Paquete.findOne({ where: { codigoQrPaquete } });

  if (!pesoPaquete || !unidadesPaquete || !contenidoPaquete || !documentoDestinatario || !nombreDestinatario || !correoDestinatario || !telefonoDestinatario || !fechaAproxEntrega || !documentoRemitente || !idEstado || !idTipo) {
    return res.json({
      status: 'error',
      msj: 'Uno o más campos vacíos',
    });
  }

  if (isNaN(pesoPaquete) || isNaN(unidadesPaquete) || isNaN(telefonoDestinatario)) {
    return res.json({
      status: "error",
      msj: "El campo peso deben ser numerico",
    });
  }

  if (!paqId) {
    return res.json({
      status: 'error',
      msj: 'No existe el paquete',
    });
  }
  /* const userDoc = await Usuario.findByPk(documentoUsuario);
  if (!userDoc) {
    return res.json({
      status: 'error',
      msj: 'El documento del usuario no existe',
    });
  } */

  const remitente = await Cliente.findOne({ where: { documentoCliente: documentoRemitente } });
  if (!remitente) {
    return res.json({
      status: 'error',
      msj: 'El documento del cliente no existe',
    });
  }

  /* if (documentoDestinatario === documentoRemitente) {
    return res.json({
      status: 'error',
      msj: 'El documento del destinatario y el remitente no pueden ser iguales',
    });
  } */

  const estado = await EstadoPaquete.findByPk(idEstado);
  if (!estado) {
    return res.json({
      status: 'error',
      msj: 'El estado no existe',
    });
  }

  /* const tamano = await TamanoPaquete.findByPk(idTamano);
  if (!tamano) {
    return res.json({
      status: 'error',
      msj: 'El tamaño no existe',
    });
  } */

  /* //Validar la variable idTamano por si el campo recibido es vacion que este sea nulo
  if (idTamano == '') {
    idTamano = null;
  } */

  const tipo = await TipoPaquete.findByPk(idTipo);
  if (!tipo) {
    return res.json({
      status: 'error',
      msj: 'El tipo no existe',
    });
  }

  await paqId.update({ codigoQrPaquete, pesoPaquete, unidadesPaquete, contenidoPaquete, documentoDestinatario, nombreDestinatario, correoDestinatario, telefonoDestinatario, fechaAproxEntrega, idUsuario, documentoRemitente, idEstado, idTamano, idTipo });

  res.json({
    status: 'ok',
    msj: 'Paquete actualizado con éxito',
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const paqId = await Paquete.findByPk(id);

  if (!paqId) {
    return res.json({
      status: 'error',
      msj: 'El paquete no existe o ya ha sido eliminado',
    });
  }

  await paqId.destroy();

  res.json({
    status: 'ok',
    msj: 'Paquete eliminado con éxito',
  });
});

module.exports = router;
