const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ msj: 'Token no proporcionado' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWTSECRET);
    const user = await Usuario.findByPk(uid);

    if (!user) {
      return res.json({ 
            sttaus: "error",
            msj: 'Token no válido - usuario no registrado' 
        });
    }

    if (user.idEstado !== 1) {
      return res.json({ 
            status: "error",
            msj: 'Token no válido - usuario no habilitado' 
        });
    }

    // Token válido
    return res.json({ 
        status: "ok",
        msj: 'Token válido' 
    });
    
  } catch (error) {
    
    return res.json({ 
        status: "error",
        msj: 'Token no válido' 
    });
  }
});

module.exports = router;
