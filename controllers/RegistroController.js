const RegistroUsuario = require("../models/RegistroModel");
const RegistroUsuarioSalida = require("../models/RegistroSalidaModel");

var controllerRegistro = {

    // Guardar datos ingreso 
    save: async function (req, res) {
        const { fechaInicio, estado } = req.body;
        console.log('Sesión completa:', req.session); // Línea de depuración
        const userId = req.session.user && req.session.user.id; // Obtener userId de la sesión
        console.log('userId:', userId); // Línea de depuración

        if (!userId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        if (!fechaInicio || !estado) {
            return res.status(400).json({ message: 'Validación de datos incorrecta' });
        }

        try {
            const newRegistro = new RegistroUsuario({
                user: userId,
                fechaInicio,
                estado
            });

            const savedRegistro = await newRegistro.save();
            res.status(201).json(savedRegistro);
        } catch (error) {
            console.error('Error al guardar los registros:', error);
            res.status(500).json({ message: 'Error al guardar los registros' });
        }
    },
    // Guardar datos salida 
    saveSalida: async function (req, res) {
        const { fechaFin, estado } = req.body;
        console.log('Sesión completa:', req.session); // Línea de depuración
        const userId = req.session.user && req.session.user.id; // Obtener userId de la sesión
        console.log('userId:', userId); // Línea de depuración

        if (!userId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        if (!fechaFin || !estado) {
            return res.status(400).json({ message: 'Validación de datos incorrecta' });
        }

        try {
            const newRegistro = new RegistroUsuarioSalida({
                user: userId,
                fechaFin,
                estado
            });

            const savedRegistro = await newRegistro.save();
            res.status(201).json(savedRegistro);
        } catch (error) {
            console.error('Error al guardar los registros:', error);
            res.status(500).json({ message: 'Error al guardar los registros' });
        }
    },
    // mostrar Registros
    mostrarRegistros: async function (req, res) {
        const userId = req.session.user && req.session.user.id;

        if (!userId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        try {
            const registro = await RegistroUsuario.find({ user: userId });
            res.json(registro); // Enviar todos los registro encontrados como respuesta
            console.log(registro);

        } catch (error) {
            console.error('Error al buscar registro:', error);
            res.status(500).json({ message: 'Error al buscar registro' });
        }
    },
}
module.exports = controllerRegistro;