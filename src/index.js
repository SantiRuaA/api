const express = require("express");
const cors = require("cors");
const tokenRoute = require("./middlewares/tokenRoute");
const usuarios = require("./routes/usuario")
const auth = require('./routes/auth')
const tipoNovedades = require("./routes/tipoNovedad")
const estadoUsuario = require("./routes/estadoUsuario");
const tipoDocumentoUsuario = require("./routes/tipoDocumentoUsuario");
const tipoDocumentoCliente = require("./routes/tipoDocumentoCliente");
const roles = require("./routes/rol")
const EstadoPaquete = require("./routes/estadoPaquete");
const TamanoPaquete = require("./routes/tamanoPaquete");
const TipoPaquete = require("./routes/tipoPaquete");
const permisos = require("./routes/permiso");
const rolPermisos = require("./routes/rolPermiso");
const clientes = require("./routes/cliente");
const paquetes = require("./routes/paquete");
const entregas = require("./routes/entrega");
const listaPaquetes = require("./routes/listaPaquete");
const novedades = require("./routes/novedad");
const db = require("./db/database");
const app = express();
const DB_PORT = process.env.DB_PORT || 5951;

(async () => {
    try {
        await db.authenticate()
        await db.sync();
        console.log("melos en la base de datos");
    } catch (error) {
        throw new Error("su puta madre", error)
    }

})()

//middlewares
app.use(express.json()); //recibir datos en formato JSON.

app.use(cors({
    origin: '*'
}));

app.use('/usuario', usuarios);

app.use('/token', tokenRoute);

app.use('/tipoNovedad', tipoNovedades);

app.use('/estadoUsuario', estadoUsuario);

app.use('/estadoPaquete', EstadoPaquete);

app.use('/tamanoPaquete', TamanoPaquete);

app.use('/tipoPaquete', TipoPaquete);

app.use('/tipoDocumentoUsuario', tipoDocumentoUsuario);

app.use('/tipoDocumentoCliente', tipoDocumentoCliente);

app.use('/rol', roles);

app.use('/permiso', permisos);

app.use('/rolPermiso', rolPermisos);

app.use('/cliente', clientes);

app.use('/paquete', paquetes);

app.use('/entrega', entregas);

app.use('/listaPaquete', listaPaquetes);

app.use('/novedad', novedades);

app.use('/auth', auth)


app.listen(DB_PORT, () => {
    console.log("Servidor trotando en el puerto: ", DB_PORT);
});