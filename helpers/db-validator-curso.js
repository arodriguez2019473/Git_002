const Curso = require('../models/curso');

const existeCursoById = async (id = '') =>{
    const existeCurso = await Curso.findById(id);
    if(!existeCurso){
        throw new Error(`El curso con el ID ${id} no existe en la base de datos`);
    }
}


module.exports = {
    existeCursoById
}
