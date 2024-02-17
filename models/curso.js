const { Schema, model } = require('mongoose');

const CursoSchema = Schema({

    materia:{
        type: String,
        required: [true, 'el nombre es obligatorio']   
    },

    profesor:{
        type: Schema.Types.ObjectId,
        ref: 'Profesor',
        require: [true, 'el nombre del profe es obligatorio']  
    },

    tiempo:{
        type: String,
        require: [true, 'el tiempo del curso es obligatorio']
    },

    descripcion:{
        type: String,
        requre: [true, 'la descripcion del curso es obligatoria']
    },  

    estado:{
        type: Boolean,
        default:true
    }

});

module.exports = model('Curso', CursoSchema);