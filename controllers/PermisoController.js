const Permission = require('../models/permisosModel');
const moment = require('moment');

var controllerPermiso = {

  listarPermisos: async function (req, res) {
    try {
        const permisos = await Permission.find().populate('user', 'nombre apellido'); // Busca todos los permisos en la base de datos

        // Formatear la fecha para cada permiso
        const permisosFormateados = permisos.map(permiso => {
            const fechaFormateadaStart = moment(permiso.startDate).format('YYYY-MM-DD'); 
            const fechaFormateadaEND = moment(permiso.endDate).format('YYYY-MM-DD'); 
            return {
                ...permiso._doc, // Copiar los otros campos del permiso
                startDate: fechaFormateadaStart, // Reemplazar la fecha con la fecha formateada
                endDate: fechaFormateadaEND // Reemplazar la fecha con la fecha formateada
            };
        });

        res.json(permisosFormateados); // Devuelve los permisos formateados como respuesta JSON
    } catch (error) {
        console.error('Error al obtener permisos:', error);
        res.status(500).json({ message: 'Error al obtener permisos' });
    }
},

    // Guardar datos
    save: async function (req, res) {
        const { startDate, endDate, content } = req.body;
        console.log('Sesión completa:', req.session); // Línea de depuración
        const userId = req.session.user && req.session.user.id; // Obtener userId de la sesión
        console.log('userId:', userId); // Línea de depuración

        if (!userId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        if (!startDate || !endDate || !content) {
            return res.status(400).json({ message: 'Validación de datos incorrecta' });
        }

        try {
            const newPermission = new Permission({
                user: userId,
                startDate,
                endDate,
                content
            });

            const savedPermission = await newPermission.save();
            res.status(201).json(savedPermission);
        } catch (error) {
            console.error('Error al guardar permiso:', error);
            res.status(500).json({ message: 'Error al guardar permiso' });
        }
    },

    mostrarPermiso: async function (req, res) {
        const userId = req.session.user && req.session.user.id;

        if (!userId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        try {
            const permissions = await Permission.find({ user: userId });
            res.json(permissions); // Enviar todos los permisos encontrados como respuesta
        } catch (error) {
            console.error('Error al buscar permisos:', error);
            res.status(500).json({ message: 'Error al buscar permisos' });
        }
    },
    // Eliminar permiso por ID
  borrarPermiso: async function (req, res) {
    const permisoId = req.params.id;

    try {
      // Buscar el permiso por ID y eliminarlo
      const deletedPermiso = await Permission.findByIdAndDelete(permisoId);

      if (!deletedPermiso) {
        return res.status(404).json({ message: 'Permiso no encontrado' });
      }

      res.status(200).json({ message: 'Permiso eliminado correctamente', deletedPermiso });
    } catch (error) {
      console.error('Error al eliminar permiso:', error);
      res.status(500).json({ message: 'Error al eliminar permiso' });
    }
  }
};


module.exports = controllerPermiso;