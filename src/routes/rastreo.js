const Rastreo = require("../models/rastreo");
const Paquete = require("../models/paquete");
const estadoRastreo = require("../models/estadoRastreo");
const validateToken = require("../middlewares/tokenFunc");

const router = require("express").Router();

/* router.use(validateToken); */

router.get("/", async (req, res) => {
    const rastreo = await Rastreo.findAll();

    res.json(rastreo);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const rastreo = await Rastreo.findByPk(id);

    if (!rastreo) {
        return res.json({
            status: "error",
            msj: "No existe ningun rastreo con el id proporcionado.",
        });
    }

    res.json(rastreo);
});

router.post("/", async (req, res) => {
    const { motivoNoEntrega, idPaquete, idEstado } = req.body;  //¿ID ESTADO?

    if ( !idPaquete || !idEstado) {
        return res.json({
            status: "error",
            msj: "Uno o mas campos vacios.",
        });
    }

    const paqueteId = await Paquete.findByPk(idPaquete);

    if (!paqueteId) {
        return res.json({
            status: "error",
            msj: "El paquete no existe.",
        });
    }

    const rastreo = await Rastreo.create({ motivoNoEntrega, idPaquete, idEstado });

    res.json({
        status: "ok",
        msj: "Rastreo creado exitosamente.",
        Rastreo: rastreo
    });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { idRastreo, motivoNoEntrega, idPaquete, idEstado } = req.body;
    const rastreoId = await Rastreo.findByPk(idRastreo);

    if (!idPaquete || !idEstado) {
        return res.json({
            status: "error",
            msj: "Uno o mas campos vacios.",
        });
    }

    await rastreoId.update({ idRastreo, motivoNoEntrega, idPaquete, idEstado });

    res.json({
        status: "ok",
        msj: "Rastreo actualizado exitosamente.",
        Rastreo: rastreoId
    });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const rastreoId = await Rastreo.findByPk(id);

    if (!rastreoId) {
        return res.json({
            status: "error",
            msj: "No existe ningun rastreo con el id proporcionado.",
        });
    }

    await rastreoId.destroy();

    res.json({
        status: "ok",
        msj: "Rastreo eliminado exitosamente.",
        Rastreo: rastreoId
    });
});

module.exports = router;