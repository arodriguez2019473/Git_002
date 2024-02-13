const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../controllers/alumno.controller');

const {
    getalumnosById,
    alumnoGet,
    alumnosDelete,
    putAlumnos,
    alumnosPost } = require('../controllers/alumno.controller');

    const {} = require('../helpers/db-validators');