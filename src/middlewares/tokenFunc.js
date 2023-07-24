const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require('dotenv').config();

const validateToken = async (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({ msj: 'Token no proporcionado.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    const { uid } = decodedToken;

    const user = await Usuario.findByPk(uid);

    if (!user) {
      return res.json({
        status: 'error',
        msj: 'Token inválido.',
      });
    }

    if (user.idEstado !== 1) {
      return res.json({
        status: 'error',
        msj: 'Token inválido.',
      });
    }

    // Verificar expiración del token
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTimestamp) {
      return res.json({
        status: 'error',
        msj: 'Token inválido.',
      });
    }

    // Token válido, llamar a la siguiente función (ruta)
    next();

  } catch (error) {
    return res.json({
      status: 'error',
      msj: 'Token inválido.',
    });
  }
};

module.exports = validateToken;