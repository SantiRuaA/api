const Paquete = require('../models/paquete');
const Cliente = require('../models/cliente');
const EstadoPaquete = require('../models/estadoPaquete');
const TipoPaquete = require('../models/tipoPaquete');
const validateToken = require('../middlewares/tokenFunc');

const router = require('express').Router();

router.use(validateToken);

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
      idCliente: cliente.idCliente,
      idTipoDocumento: cliente.idTipoDocumento,
      documento: cliente.documentoCliente,
      nombre: cliente.nombreCliente,
      direccion: cliente.direccionCliente,
      detalleDireccion: cliente.detalleDireccionCliente,
      telefono: cliente.telefonoCliente,
      correo: cliente.correoCliente,
      lat: cliente.lat,
      lng: cliente.lng
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const paquete = await Paquete.findByPk(id);

  if (!paquete) {
    return res.json({
      status: 'error',
      msj: 'No existe el paquete',
    });
  }

  res.json(paquete);
});

router.get('/data/:codigoPaquete', async (req, res) => {
  const { codigoPaquete } = req.params;
  const paquete = await Paquete.findOne({ where: { codigoPaquete } })

  if (!paquete) {
    return res.json({
      status: 'error',
      msj: 'No existe el paquete',
    });
  }

  res.json(paquete);
});

router.post('/', async (req, res) => {
  const { codigoPaquete, direccionPaquete, detalleDireccionPaquete, pesoPaquete, contenidoPaquete, documentoDestinatario, nombreDestinatario, correoDestinatario, telefonoDestinatario, fechaAproxEntrega, idUsuario, documentoRemitente, idEstado, idTamano, idTipo, lat, lng } = req.body;


  if (!codigoPaquete || !pesoPaquete || !contenidoPaquete || !documentoDestinatario || !nombreDestinatario || !correoDestinatario || !telefonoDestinatario || !fechaAproxEntrega || !documentoRemitente || !idTipo || !lat || !lng) {
    return res.json({
      status: 'error',
      msj: 'Uno o más campos vacíos',
    });
  }

  const codExits = await Paquete.findOne({ where: { codigoPaquete } });
  if (codExits) {
    return res.json({
      status: 'error',
      msj: 'Ya hay un paquete registrado con ese codigo.',
    });
  }

  if (isNaN(pesoPaquete) || isNaN(telefonoDestinatario)) {
    return res.json({
      status: "error",
      msj: "El campo peso deben ser numerico",
    });
  }

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

  const paquete = await Paquete.create({ codigoPaquete, direccionPaquete, detalleDireccionPaquete, pesoPaquete, contenidoPaquete, documentoDestinatario, nombreDestinatario, correoDestinatario, telefonoDestinatario, fechaAproxEntrega, idUsuario, documentoRemitente, idEstado, idTamano, idTipo, lat, lng });

  res.json({
    status: 'ok',
    msj: 'Paquete creado exitosamente',
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { idPaquete, codigoPaquete, direccionPaquete, detalleDireccionPaquete, pesoPaquete, contenidoPaquete, documentoDestinatario, nombreDestinatario, correoDestinatario, telefonoDestinatario, fechaAproxEntrega, idUsuario, documentoRemitente, idEstado, idTamano, idTipo, lat, lng } = req.body;
  const paqId = await Paquete.findByPk(idPaquete);

  if (!pesoPaquete || !contenidoPaquete || !documentoDestinatario || !nombreDestinatario || !correoDestinatario || !telefonoDestinatario || !fechaAproxEntrega || !documentoRemitente || !idEstado || !idTipo || !lat || !lng) {
    return res.json({
      status: 'error',
      msj: 'Uno o más campos vacíos',
    });
  }

  if (isNaN(pesoPaquete) || isNaN(telefonoDestinatario)) {
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

  await paqId.update({ codigoPaquete, direccionPaquete, detalleDireccionPaquete, pesoPaquete, contenidoPaquete, documentoDestinatario, nombreDestinatario, correoDestinatario, telefonoDestinatario, fechaAproxEntrega, idUsuario, documentoRemitente, idEstado, idTamano, idTipo, lat, lng });

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
