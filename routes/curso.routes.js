const { Router } = require('express');
const { check } = require('express-validator');

const { tieneRolAutorizado, esAlumno, esProfesor  } = require('../middlewares/validar-roles');
const { validarCampos,validarNombreProfesor } = require('../middlewares/validar-campos');

const { 
    getCursoById,
    cursosGet,
    cursosDelete,
    putCurso, 
    cursosPost,
    getCursosByProfesor
 } = require('../controllers/curso.controller');

const { existeCursoById } = require('../helpers/db-validator-curso');
const { esRoleValidoP } = require('../helpers/db-validators-profesor');

const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

router.get('/', cursosGet);

/*router.get(
    "/:id",
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ],
    getCursoById
);
*/
router.get(
    "/:profesor",
    [
        check('profesor', 'El nombre del profesor no puede estar vacío').not().isEmpty(),
        validarCampos
    ],
    getCursosByProfesor
);

router.put(
    '/:id',
        [
            
        validarJWT,
        tieneRolAutorizado('TEACHER_ROLE'),
        check("materia", "La materia no puede estar vacía").not().isEmpty(),
        check("profesor", "El nombre del profesor no puede estar vacío").not().isEmpty(),
        check("tiempo", "El tiempo no puede estar vacío").not().isEmpty(),
        check("descripcion", "La descripción no puede estar vacía").not().isEmpty(),
        validarCampos,

        ],putCurso);

router.post(
        '/',
        [

        validarJWT,
        tieneRolAutorizado('TEACHER_ROLE'),
        check("materia", "La materia no puede estar vacía").not().isEmpty(),
        check("profesor", "El nombre del profesor no puede estar vacío").not().isEmpty(),
        check("tiempo", "El tiempo no puede estar vacío").not().isEmpty(),
        check("descripcion", "La descripción no puede estar vacía").not().isEmpty(),
        validarNombreProfesor,
        validarCampos,

        ], cursosPost);

router.delete(
    "/:id",
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeCursoById),
        validarCampos
    ],
    cursosDelete
);

module.exports = router;
