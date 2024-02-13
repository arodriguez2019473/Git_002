const Role = require('../models/role');
const Alumno = require('../models/alumno');

const esRoleValido = async (role = '') => {
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
