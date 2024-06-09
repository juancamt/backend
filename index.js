const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require ("cors")
const port = 3000;

const usuario_routes = require("./routes/usuarios");
const empleado_routes = require("./routes/empleados");
// const jugador_routes = require("./router/jugador");
// const equipo_routes = require("./router/equipo");
// const partido_routes = require("./router/partido");

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());
mongoose.connect("mongodb://localhost:27017/gestion",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4

})
.then(()=>{
    app.use(express.json());
    app.use("/api",usuario_routes);
    app.use("/api",empleado_routes);
    // app.use("/api",jugador_routes);
    // app.use("/api",equipo_routes);
    // app.use("/api",partido_routes);

    app.listen(port,()=>{
        console.log("servidor corriendo en el puerto",port);
    })

})
.catch(error =>console.log(error));