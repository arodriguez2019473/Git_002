const { request, response } = require("express");
const Profesor = require("../models/profesor");
const Alumno = require("../models/alumno");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
    const { correo, password, role } = req.body;

    try {
        let usuario;

        if (role === 'TEACHER_ROLE') {
            usuario = await Profesor.findOne({ correo });
        } else if (role === 'STUDENT_ROLE') {
            usuario = await Alumno.findOne({ correo });
        } else {
            return res.status(400).json({ msg: "Rol no válido" });
        }

        if (!usuario) {
            return res.status(400).json({ msg: "Credenciales incorrectas, correo no existe en la base de datos." });
        }

        if (!usuario.estado) {
            return res.status(400).json({ msg: "El usuario no está activo en la base de datos." });
        }

        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({ msg: "La contraseña es incorrecta" });
        }

        const token = await generarJWT(usuario.id, role);

        res.status(200).json({
            msg: "Inicio de sesión exitoso",
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

module.exports = {
    login
};
