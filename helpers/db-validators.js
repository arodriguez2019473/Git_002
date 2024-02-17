const Role = require('../models/role');
const Alumno = require('../models/alumno');

const esRoleValidoA = async (role = '') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol) {
        throw new Error(`el role ${ role } no existe en la base de datos`);
    }
}

const existenteEmail = async (correo = '') =>{
    const existeEmail = await Alumno.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existeAlumnoById = async (id = '') =>{
    const existeAlumno = await Alumno.findOne({id});
    if(existeAlumno){
        throw new Error(`el usuario con el ${ _id } no existe`)
    }
}

module.exports = {

    esRoleValidoA,
    existenteEmail,
    existeAlumnoById

}