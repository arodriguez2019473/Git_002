const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    getalumnosById,
    alumnosGet,
    alumnosDelete,
    putAlumnos,
    alumnosPost } = require('../controllers/alumno.controller');

    const {existenteEmail, esRoleValido, existeAlumnoById} = require('../helpers/db-validators');

const router = Router();

router.get("/", alumnosGet);

router.get(
    "/:id",
    [

        check('id', `no es un id valido`).isMongoId(),
        check('id').custom(existeAlumnoById),

        validarCampos

    ],getalumnosById);

router.put(
    "/:id",
    [

        check('id',`No es un id valido `).isMongoId(),
        check('id').custom(existeAlumnoById),
        check("role").custom(esRoleValido),

        validarCampos

    ],putAlumnos);

router.post(
    "/",
    [

        check("nombre", "el nombre no puede estar vacio").not().isEmpty(),
        check("password","El Password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo","Este no es un correo valido").isEmail(),

        check("correo").custom(existenteEmail),
//        check("role").custom(esRoleValido),

        validarCampos,

    ],alumnosPost);

router.delete(
    "/:id",

    [

        check('id', `no es un id valido`).isMongoId(),
        check('id').custom(existeAlumnoById),

        validarCampos
    ],alumnosDelete);

    module.exports = router;