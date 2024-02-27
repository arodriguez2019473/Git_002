const { validationResult } = require('express-validator');
const Profesor = require('../models/profesor');

const validarCampos = (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){


        return res.status(400).json(error);
    }

    next();

}

const validarNombreProfesor = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { profesor } = req.body;

    try {
        const existeProfesor = await Profesor.exists({ nombre: profesor });
        if (!existeProfesor) {
            return res.status(400).json({ msg: 'El nombre del profesor no existe en la base de datos' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error de servidor' });
    }

    next();
};

module.exports = {
    validarCampos,
    validarNombreProfesor
}