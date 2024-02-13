const { Schema, model } = require('mongoose');

const MateriaSchema = Schema({

    materia:{
        type: String,
        required: [true, 'el nombre es obligatorio']   
    },

    profesor:{
        type: String,
        require: [true, 'el nombre del profe es obligatorio']  
    },

    tiempo:{
        type: String,
        require: [true, 'el tiempo del curso es obligatorio']
    },

    descripcion:{
        type: String,
        requre: [true, 'la descripcion del curso es obligatoria']
    }

})