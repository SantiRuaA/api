const Paquete = require('../models/paquete');
const Cliente = require('../models/cliente');
const Usuario = require('../models/Usuario');
const EstadoPaquete = require('../models/estadoPaquete');
const TamanoPaquete = require('../models/tamanoPaquete');
const validateJWT = require('../middlewares/tokenValidation');
const validateRol = require('../middlewares/validateRol');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const paquetes = await Paquete.findAll();

  if (paquetes.length === 0) {
    return res.json({
      status: 'error',
      msj: 'No hay paquetes registrados',
    });
  }

  res.json(paquetes);
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

router.get('/:idCliente/direccion', async (req, res) => {
  const { idCliente } = req.params;

  try {
    const cliente = await Cliente.findByPk(idCliente);


    if (!cliente) {
      return res.json({
        error: 'El cliente no existe',
      });
    }

    res.json({
      direccion: cliente.direccionCliente,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/:idCliente/telefono', async (req, res) => {
  const { idCliente } = req.params;

  try {
    const cliente = await Cliente.findByPk(idCliente);


    if (!cliente) {
      return res.json({
        error: 'El cliente no existe',
      });
    }

    res.json({
      telefono: cliente.telefonoCliente,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/:idCliente/correo', async (req, res) => {
  const { idCliente } = req.params;

  try {
    const cliente = await Cliente.findByPk(idCliente);


    if (!cliente) {
      return res.json({
        error: 'El cliente no existe',
      });
    }

    res.json({
      correo: cliente.correoCliente,
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
  const { codigoQrPaquete, pesoPaquete, documentoUsuario, documentoRemitente, documentoDestinatario, idEstado, idTamano } = req.body;
  const paq = await Paquete.findOne({ where: { codigoQrPaquete } });

  if (!codigoQrPaquete || !documentoRemitente || !documentoDestinatario || !idEstado || !idTamano) {
    return res.json({
      status: 'error',
      msj: 'Uno o más campos vacíos',
    });
  }//nou

  /*if (paq) {
    return res.status(409).json({
      status: 'error',
      msj: 'El paquete ya existe',
    });
  }*/

  /*const userDoc = await Usuario.findByPk(documentoUsuario);
  if (!userDoc) {
    return res.json({
      status: 'error',
      msj: 'El documento del usuario no existe',
    });
  }*/

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

  const tamano = await TamanoPaquete.findByPk(idTamano);
  if (!tamano) {
    return res.json({
      status: 'error',
      msj: 'El tamaño no existe',
    });
  }

  const paquete = await Paquete.create({ codigoQrPaquete, pesoPaquete, documentoUsuario, documentoRemitente, documentoDestinatario, idEstado, idTamano });

  res.json({
    status: 'ok',
    msj: 'Paquete creado exitosamente',
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { idPaquete, codigoQrPaquete, pesoPaquete, documentoUsuario, documentoRemitente, documentoDestinatario, idEstado, idTamano } = req.body;
  const paqId = await Paquete.findByPk(idPaquete);
  const paq = await Paquete.findOne({ where: { codigoQrPaquete } });

  if (!codigoQrPaquete || !documentoUsuario || !documentoRemitente || !documentoDestinatario || !idEstado || !idTamano) {
    return res.json({
      error: 'Uno o más campos vacíos',
    });
  }


  const userDoc = await Usuario.findByPk(documentoUsuario);
  if (!userDoc) {
    return res.json({
      status: 'error',
      msj: 'El documento del usuario no existe',
    });
  }

  const remitente = await Cliente.findByPk(documentoRemitente);
  const destinatario = await Cliente.findByPk(documentoDestinatario);
  if (!remitente || !destinatario) {
    return res.json({
      status: 'error',
      msj: 'El documento del cliente no existe',
    });
  }

  const estado = await EstadoPaquete.findByPk(idEstado);
  if (!estado) {
    return res.json({
      status: 'error',
      msj: 'El estado no existe',
    });
  }

  const tamano = await TamanoPaquete.findByPk(idTamano);
  if (!tamano) {
    return res.json({
      status: 'error',
      msj: 'El tamaño no existe',
    });
  }

  await paqId.update({ codigoQrPaquete, pesoPaquete, documentoUsuario, documentoRemitente, documentoDestinatario, idEstado, idTamano });

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
