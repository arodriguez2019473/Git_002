const jwt = require('jsonwebtoken');
const Profesor = require('../models/profesor');
const { request, response } = require('express');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token'); // Corrección aquí

    if (!token) {

        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const profesor = await Profesor.findById(uid);
        
        if (!profesor) {
            return res.status(401).json({
                msg: "El Usuario no se encuentra en la base de datos"
            });
        }

        if (!profesor.estado) {
        
            return res.status(401).json({
                msg: "Token no válido, usuario con el estado false"
            });
        }

        req.profesor = profesor;
        next();
    } 
    catch (e) {
        console.error(e);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
};

module.exports = {
    validarJWT
};
