var validator = require("validator");
var Empleado = require("../models/EmpleadosModel");

var controllerEmpleado = {
    // Guardar datos 
    save: async function (req, res) {
        var params = req.body;

        // Validar datos de entrada 
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_pass = !validator.isEmpty(params.contraseña);
        var validate_email = !validator.isEmpty(params.correo) && validator.isEmail(params.correo);
        var validate_apellido = !validator.isEmpty(params.apellido);
        var validate_telefono = !validator.isEmpty(params.telefono);
        var validate_genero = !validator.isEmpty(params.genero);
        var validate_direccion = !validator.isEmpty(params.direccion);


        if (validate_name &&
            validate_pass && 
            validate_email &&
            validate_apellido &&
            validate_telefono &&
            validate_genero&&
            validate_direccion
        ) {
            try {
                // Crear una nueva instancia de Usuario
                var empleado = new Empleado({
                    nombre: params.nombre,
                    contraseña: params.contraseña,
                    correo: params.correo,
                    apellido: params.apellido,
                    telefono: params.telefono,
                    genero: params.genero,
                    direccion :params.direccion
                });

                // Guardar el usuario
                const empleadoStored = await empleado.save();
                return res.status(200).send({
                    message: "Empleado guardado",
                    empleadoStored
                });
            } catch (err) {
                return res.status(500).send({
                    message: "Error al guardar el empleado",
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
// listar  empleados 
    listarEmpleado: async function (req, res) {
        try {
            const empleados = await Empleado.find();
            return res.status(200).send({
                message: "Empleados encontrados",
                empleado: empleados
            });
        } catch (err) {
            console.error("Error al buscar empleados:", err);
            return res.status(500).send({
                error: "Error al buscar empleados"
            });
        }
    },
    // listar el empleado id
    mostrarEmpleado: async function (req, res) {
        var empleadoId = req.params.id;
        try {
            const empleado = await Empleado.findById(empleadoId);
            if (!empleado) {
                return res.status(404).send({
                    message: "Empleado no encontrado",
                    status: "error"
                });
            }
            return res.status(200).send({
                message: "Empleado encontrado",
                status: "success",
                empleado: empleado
            });
        } catch (err) {
            console.error("Error al buscar el empleado:", err);
            return res.status(500).send({
                message: "Error en la petición",
                status: "error"
            });
        }
    },
    delete: async function (req, res) {
        var empleadoId = req.params.id;
    
        try {
            const empleadoRemoved = await Empleado.findOneAndDelete({ _id: empleadoId});
            if (!empleadoRemoved) {
                return res.status(404).send({
                    message: "Empleado no encontrado para eliminar",
                    status: "error"
                });
            }
            return res.status(200).send({
                message: "Empleado eliminado correctamente",
                status: "success",
                empleado: empleadoRemoved
            });
        } catch (err) {
            console.error("Error al eliminar el empleado:", err);
            return res.status(500).send({
                message: "Error en la petición",
                status: "error"
            });
        }
    },
    update: async function (req, res) {
        var params = req.body;
        var empleadoId = req.params.id;
    
        var validate_name = !validator.isEmpty(params.nombre);
        var validate_pass = !validator.isEmpty(params.contraseña);
        var validate_email = !validator.isEmpty(params.correo) && validator.isEmail(params.correo);
        var validate_apellido = !validator.isEmpty(params.apellido);
        var validate_telefono = !validator.isEmpty(params.telefono);
        var validate_genero = !validator.isEmpty(params.genero);


        if (validate_name &&
            validate_pass && 
            validate_email &&
            validate_apellido &&
            validate_telefono &&
            validate_genero 
        ) {
            var update = {
                nombre: params.nombre,
                contraseña: params.contraseña,
                correo: params.correo,
                apellido: params.apellido,
                telefono: params.telefono,
                genero: params.genero
            };
    
            try {
                const empleadoUpdate = await Empleado.findOneAndUpdate({ _id: empleadoId }, update, { new: true });
                if (!empleadoUpdate) {
                    return res.status(404).send({
                        message: "Empleado no encontrado para actualizar",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message: "Empleado actualizado correctamente",
                    status: "success",
                    empleadoUpdate
                });
            } catch (err) {
                console.error("Error al actualizar el Empleado:", err);
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

module.exports = controllerEmpleado;