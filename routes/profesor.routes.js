const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    
    profesoresGet,
    profesoresPost,
    getprofesoresById,
    profesoresDelete,
    putProfesor } = require('../controllers/profesor.controller');

    const {existeProfesorById,existenteEmailProfesor , esRoleValido} = require('../helpers/db-validators-profesor');

const router = Router();

router.get("/", profesoresGet);

router.get(
    "/:id",
    [
        check('id', `no es un id valido`).isMongoId(),
        check('id').custom(existeProfesorById),
    
        validarCampos
    ],getprofesoresById);

router.put(
    "/:id",
    [
        check('id', `no es un id valido`).isMongoId(),
        check('id').custom(existeProfesorById),

        validarCampos
    ],putProfesor);

router.post(
    "/",
    [
        check("nombre","el nombre no puede estar vacio").not().isEmpty(),
        check("password","el passwordd debe ser mayor a 6 caracteres").isLength({min:6}),

        check("correo").custom(existenteEmailProfesor),

        validarCampos
    ],profesoresPost);

router.delete(
    "/:id",
    [
        check('id', `no es un id valido`).isMongoId(),
        check('id').custom(existeProfesorById),

        validarCampos
    ],profesoresDelete);

    module.exports = router;