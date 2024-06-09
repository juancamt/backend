var validator = require("validator");
var Usuario = require("../models/UsuarioModel");

var controllerUsuario = {
    // Guardar datos 
    save: async function (req, res) {
        var params = req.body;

        // Validar datos de entrada 
        var validate_rol = !validator.isEmpty(params.rol);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_pass = !validator.isEmpty(params.contraseña);
        var validate_email = !validator.isEmpty(params.correo) && validator.isEmail(params.correo);
        var validate_apellido = !validator.isEmpty(params.apellido);
        var validate_telefono = !validator.isEmpty(params.telefono);
        var validate_genero = !validator.isEmpty(params.genero);
        var validate_años = !validator.isEmpty(params.años);


        if (validate_name &&
            validate_pass && 
            validate_rol && 
            validate_email &&
            validate_apellido &&
            validate_telefono &&
            validate_genero &&
            validate_años
        ) {
            try {
                // Crear una nueva instancia de Usuario
                var usuario = new Usuario({
                    rol: params.rol,
                    nombre: params.nombre,
                    contraseña: params.contraseña,
                    correo: params.correo,
                    apellido: params.apellido,
                    telefono: params.telefono,
                    genero: params.genero,
                    años: params.años
                });

                // Guardar el usuario
                const userStored = await usuario.save();
                return res.status(200).send({
                    message: "Usuario guardado",
                    userStored
                });
            } catch (err) {
                return res.status(500).send({
                    message: "Error al guardar el usuario",
                    status: "error",
                    error: err.message
                });
            }
        } else {
            return res.status(400).send({
                message: "Validación de datos incorrecta",
                status: "error"
            });
        }
    },
// listar  usuarios 
    listarUsuarios: async function (req, res) {
        try {
            const usuarios = await Usuario.find();
            return res.status(200).send({
                message: "Usuarios encontrados",
                usuarios: usuarios
            });
        } catch (err) {
            console.error("Error al buscar usuarios:", err);
            return res.status(500).send({
                error: "Error al buscar usuarios"
            });
        }
    },
    // listar el usuario id
    mostrarUsuario: async function (req, res) {
        var usuarioId = req.params.id;
        try {
            const usuario = await Usuario.findById(usuarioId);
            if (!usuario) {
                return res.status(404).send({
                    message: "Usuario no encontrado",
                    status: "error"
                });
            }
            return res.status(200).send({
                message: "Usuario encontrado",
                status: "success",
                usuario: usuario
            });
        } catch (err) {
            console.error("Error al buscar el usuario:", err);
            return res.status(500).send({
                message: "Error en la petición",
                status: "error"
            });
        }
    },
    delete: async function (req, res) {
        var usuarioId = req.params.id;
    
        try {
            const userRemoved = await Usuario.findOneAndDelete({ _id: usuarioId });
            if (!userRemoved) {
                return res.status(404).send({
                    message: "Usuario no encontrado para eliminar",
                    status: "error"
                });
            }
            return res.status(200).send({
                message: "Usuario eliminado correctamente",
                status: "success",
                usuario: userRemoved
            });
        } catch (err) {
            console.error("Error al eliminar el usuario:", err);
            return res.status(500).send({
                message: "Error en la petición",
                status: "error"
            });
        }
    },
    update: async function (req, res) {
        var params = req.body;
        var usuarioId = req.params.id;
    
        var validate_rol = !validator.isEmpty(params.rol);
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_pass = !validator.isEmpty(params.contraseña);
        var validate_email = !validator.isEmpty(params.correo) && validator.isEmail(params.correo);
        var validate_apellido = !validator.isEmpty(params.apellido);
        var validate_telefono = !validator.isEmpty(params.telefono);
        var validate_genero = !validator.isEmpty(params.genero);
        var validate_años = !validator.isEmpty(params.años);


        if (validate_name &&
            validate_pass && 
            validate_rol && 
            validate_email &&
            validate_apellido &&
            validate_telefono &&
            validate_genero &&
            validate_años
        ) {
            var update = {
                nombre: params.nombre,
                contraseña: params.contraseña,
                correo: params.correo,
                rol: params.rol,
                apellido: params.apellido,
                telefono: params.telefono,
                genero: params.genero,
                años: params.años                
            };
    
            try {
                const userUpdate = await Usuario.findOneAndUpdate({ _id: usuarioId }, update, { new: true });
                if (!userUpdate) {
                    return res.status(404).send({
                        message: "Usuario no encontrado para actualizar",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message: "Usuario actualizado correctamente",
                    status: "success",
                    userUpdate
                });
            } catch (err) {
                console.error("Error al actualizar el usuario:", err);
                return res.status(500).send({
                    message: "Error en la petición",
                    status: "error"
                });
            }
        } else {
            return res.status(400).send({
                message: "Validación de datos incorrecta",
                status: "error"
            });
        }
    }
    
    
};

module.exports = controllerUsuario;