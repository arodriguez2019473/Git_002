const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');

exports.login = async (req, res) => {
    const { correo, password, role } = req.body;
    
    try {
        let user;
        if (role === 'STUDENT_ROLE') {
            user = await Alumno.findOne({ correo, password });
        } else if (role === 'TEACHER_ROLE') {
            user = await Profesor.findOne({ correo, password });
        }

        if (!user) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
