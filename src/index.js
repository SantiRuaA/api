const express = require("express");
const cors = require("cors");
const usuarios = require("./routes/usuario")
const novedades = require("./routes/tipoNovedad")
const modulos = require("./routes/modulo")
const estadoUsuario = require("./routes/estadoUsuario");
const tipoDocumentoUsuario = require("./routes/tipoDocumentoUsuario");
const tipoDocumentoCliente = require("./routes/tipoDocumentoCliente");
const roles = require("./routes/rol")
const EstadoPaquete = require("./routes/estadoPaquete");
const permisos = require("./routes/permiso");
const rolPermisos = require("./routes/rolPermiso");
const clientes = require("./routes/cliente");
const paquetes = require("./routes/paquete");
const db = require("./db/database");
const app = express();
const port = process.env.PORT || 3030;

(async ()=>{
    try {
        await db.authenticate()
        await db.sync();
        console.log("melos a la base de datos");
    } catch (error){
        throw new Error(error)
    }

})()



//middlewares
app.use(express.json()); //Configura la aplicación para que pueda recibir datos en formato JSON.

app.use(cors());// Configura la aplicación para que permita solicitudes de otros dominios.

app.use('/usuarios',usuarios);

app.use('/tipoNovedad',novedades);

app.use('/modulo',modulos);

app.use('/estadoUsuario',estadoUsuario);

app.use('/estadoPaquete',EstadoPaquete);

app.use('/tipoDocumentoUsuario',tipoDocumentoUsuario);

app.use('/tipoDocumentoCliente',tipoDocumentoCliente);

app.use('/rol',roles);

app.use('/permiso',permisos);

app.use('/rolPermiso', rolPermisos);

app.use('/cliente',clientes);

app.use('/paquete',paquetes);

app.listen(port,() => {
    console.log("Servidor trotando en el puerto: ", port);
});