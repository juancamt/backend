const Vacaciones = require('../models/VacaionesModel');
const moment = require('moment');

var VacacionesPermiso ={

     // Guardar datos
     save: async function (req, res) {
        const { fechaInicio, fechaFin, estado } = req.body;
        console.log('Sesión completa:', req.session); // Línea de depuración
        const userId = req.session.user && req.session.user.id; // Obtener userId de la sesión
        console.log('userId:', userId); // Línea de depuración

        if (!userId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        if (!fechaInicio || !fechaFin || !estado) {
            return res.status(400).json({ message: 'Validación de datos incorrecta' });
        }

        try {
            const newVacaciones = new Vacaciones({
                user: userId,
                fechaInicio,
                fechaFin,
                estado
            });

            const savedVacaciones = await newVacaciones.save();
            res.status(201).json(savedVacaciones);
        } catch (error) {
            console.error('Error al guardar las vacaciones:', error);
            res.status(500).json({ message: 'Error al guardar las vacaciones' });
        }
    },
    mostrarVacaciones: async function (req, res) {
        const userId = req.session.user && req.session.user.id;

        if (!userId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        try {
            const vacaciones = await Vacaciones.find({ user: userId });
            res.json(vacaciones); // Enviar todas la vacaciones encontrados como respuesta
            console.log(vacaciones);

        } catch (error) {
            console.error('Error al buscar vacaciones:', error);
            res.status(500).json({ message: 'Error al buscar vacaciones' });
        }
    },

}
module.exports = VacacionesPermiso;