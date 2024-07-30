const Vacaciones = require('../models/VacaionesModel');
const moment = require('moment');

var VacacionesPermiso ={


    listarVacaciones: async function (req, res) {
        try {
            const vacaciones = await Vacaciones.find().populate('user', 'nombre apellido'); // Busca todas las vacaciones en la base de datos
    
            // Formatear la fecha para cada vacacion
            const vacionesFormateadas = vacaciones.map(vacacione => {
                const fechaFormateadaStart = moment(vacacione.fechaInicio).format('YYYY-MM-DD'); 
                const fechaFormateadaEND = moment(vacacione.fechaFin).format('YYYY-MM-DD'); 
                return {
                    ...vacacione._doc, // Copiar los otros campos del permiso
                    fechaInicio: fechaFormateadaStart, // Reemplazar la fecha con la fecha formateada
                    fechaFin: fechaFormateadaEND // Reemplazar la fecha con la fecha formateada
                };
            });
    
            res.json(vacionesFormateadas); // Devuelve las vacaciones formateados como respuesta JSON
        } catch (error) {
            console.error('Error al obtener vacaciones:', error);
            res.status(500).json({ message: 'Error al obtener vacaciones' });
        }
    },

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
    // eliminar datos
    borrarVacacion: async function (req, res) {
        const VacacionId = req.params.id;
    
        try {
          // Buscar el Vacacion por ID y eliminarlo
          const deletedVacacion = await Vacaciones.findByIdAndDelete(VacacionId);
    
          if (!deletedVacacion) {
            return res.status(404).json({ message: 'Vacacion no encontrado' });
          }
    
          res.status(200).json({ message: 'Vacacion eliminado correctamente', deletedVacacion });
        } catch (error) {
          console.error('Error al eliminar Vacacion:', error);
          res.status(500).json({ message: 'Error al eliminar Vacacion' });
        }
      }

}
module.exports = VacacionesPermiso;