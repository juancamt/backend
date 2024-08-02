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
    // mostrar registros salida
    mostrarRegistrosSalida: async function (req, res) {
        const userId = req.session.user && req.session.user.id;

        if (!userId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        try {
            const registroSalida = await RegistroUsuarioSalida.find({ user: userId });
            res.json(registroSalida); // Enviar todos los registro encontrados como respuesta
            console.log(registroSalida);

        } catch (error) {
            console.error('Error al buscar registro:', error);
            res.status(500).json({ message: 'Error al buscar registro' });
        }
    },
    // eliminar registro Salida
    eliminarRegistrosSalida: async function (req, res) {
        const registroSalidaId = req.params.id;
    
        try {
          // Buscar el Vacacion por ID y eliminarlo
          const deletedRegistroSalida = await RegistroUsuarioSalida.findByIdAndDelete(registroSalidaId);
    
          if (!deletedRegistroSalida) {
            return res.status(404).json({ message: 'Registro no encontrado' });
          }
    
          res.status(200).json({ message: 'Registro eliminado correctamente', deletedRegistroSalida });
        } catch (error) {
          console.error('Error al eliminar Registro:', error);
          res.status(500).json({ message: 'Error al eliminar Registro' });
        }
      },
    // eliminar registro
    eliminarRegistros: async function (req, res) {
        const registroId = req.params.id;
    
        try {
          // Buscar el Vacacion por ID y eliminarlo
          const deletedRegistro = await RegistroUsuario.findByIdAndDelete(registroId);
    
          if (!deletedRegistro) {
            return res.status(404).json({ message: 'Registro no encontrado' });
          }
    
          res.status(200).json({ message: 'Registro eliminado correctamente', deletedRegistro });
        } catch (error) {
          console.error('Error al eliminar Registro:', error);
          res.status(500).json({ message: 'Error al eliminar Registro' });
        }
      },
}
module.exports = controllerRegistro;