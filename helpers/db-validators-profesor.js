const Role = require('../models/role');
const Profesor = require('../models/profesor');

const esRoleValidoP = async (role = 'TEACHER_ROLE') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`el role ${ role } no existe en la base de datos`);
    }

}

const existenteEmailProfesor = async (correo = '') =>{
    const existeEmail = await Profesor.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }   
}

const existeProfesorById = async (id = '') =>{
    const existeProfesor = await Profesor.findOne({id});
    if(existeProfesor){
        throw new Error(`el usuario con el ${ _id } no existe`)
    }
}

module.exports = {

    esRoleValidoP,
    existenteEmailProfesor,
    existeProfesorById

}