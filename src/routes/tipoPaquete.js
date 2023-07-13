const TipoPaquete = require('../models/tipoPaquete');

const router = require('express').Router()


router.get('/', async (req, res) => {
    const tipos = await TipoPaquete.findAll();

    res.json(tipos);
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const tipo = await TipoPaquete.findByPk(id)

    if (!tipo) {
        return res.json({
            error: "No existe el tamaño"
        });
    }

    res.json(tipo);
});


module.exports = router