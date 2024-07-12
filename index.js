const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
const port = 3001;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Usuario = require('./models/UsuarioModel')


const usuario_routes = require("./routes/usuarios");
const permiso_routes = require("./routes/permisos");


// const equipo_routes = require("./router/equipo");
// const partido_routes = require("./router/partido");

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
    origin: 'http://localhost:3000', // Reemplaza con la URL del frontend
    credentials: true
}));
mongoose.connect("mongodb://localhost:27017/gestion", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4

})
    .then(() => {
        app.use(express.json());
        app.use(cookieParser());
        app.use(session({
            secret: 'your_secret_key',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false,httpOnly: true } // En producción, debes configurar secure a true
        }));

        app.post('/login', async (req, res) => {
            const { email, contra, role,} = req.body;
            console.log('Correo:', email, 'Contraseña:', contra, 'Rol:', role); // Debugging line
            try {
                const user = await Usuario.findOne({correo:email });
                // req.session.user = { id: user.id, username: user.nombre };
                // console.log(req.session.user);
                if (!user) {
                    return res.status(400).send('Usuario no encontrado');
                }
                if (role !== user.rol) {
                    return res.status(400).send('Rol no encontrado');
                }
                if (contra !== user.contraseña) {
                    return res.status(400).send('Contraseña incorrecta');
                }
                req.session.user = { id: user._id, username: user.nombre }; // Asegúrate de que el userId se establece correctamente
                console.log('Sesión del usuario:', req.session.user); // Línea de depuración
                // req.session.user = user;
                res.json({ message: 'Login exitoso', user });
            } catch (error) {
                console.log(error);
                res.status(500).send('Error en el servidor');
            }
        });
        
        // Ruta protegida
        app.get('/protected', (req, res) => {
            if (!req.session.user) {
                return res.status(401).send('No autenticado');
            }
            res.send(req.session.user);
        });
    
        // Ruta de logout
        app.post('/logout', (req, res) => {
            
            req.session.destroy(err => {
                if (err) {
                    return res.status(500).send('Error al cerrar sesión');
                }
                res.clearCookie('connect.sid');
                res.send('Logout exitoso');
            });
        });
    
       
        app.use("/api", usuario_routes);
        app.use("/api",permiso_routes);
       
    
        // app.use("/api",_routes);
        // app.use("/api",_routes);

        app.listen(port, () => {
            console.log("servidor corriendo en el puerto", port);
        })

    })
    .catch(error => console.log(error));

 

    