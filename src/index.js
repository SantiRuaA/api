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
app.use(express.json()); //Recibir indormacion

app.use(cors());// Habilitar otras aplicaciones para realizar solicitudes a nuestra app

app.use('/usuarios',usuarios);

app.use('/tipoNovedad',novedades);

app.use('/modulo',modulos);

app.use('/estadoUsuario',estadoUsuario);

app.use('/estadoPaquete',EstadoPaquete);

app.use('/tipoDocumentoUsuario',tipoDocumentoUsuario);

app.use('/tipoDocumentoCliente',tipoDocumentoCliente);

app.use('/rol',roles);

app.use('/permiso',permisos);

app.listen(port,() => {
    console.log("Servidor trotando en el puerto: ", port);
});