const express = require("express");
const cors = require("cors");
const usuarios = require("./routes/usuarios")
const novedades = require("./routes/tipoNovedad")
const modulos = require("./routes/modulo")
const estadoUsuario = require("./routes/estadoUsuario");
const tipoDocumentoUsuario = require("./routes/tipoDocumentoUsuario");
const EstadoPaquete = require("./routes/estadoPaquete");
const db = require("./db/database");
const app = express();
const port = process.env.PORT || 3030;

(async ()=>{
    try {
        await db.authenticate()
        await db.sync();
        console.log("Conectados a la base de datos");
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

app.listen(port,() => {
    console.log("Servcidor trotando en el puerto: ", port);
});