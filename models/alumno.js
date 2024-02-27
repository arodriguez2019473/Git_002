const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema ({

    nombre:{
        type: String,
        require: [true, 'el nombre es obligatorio']
    },

    correo:{
        type: String,
        require: [true, 'el correo es obligatorio']
    },

    password:{
        type: String,
        require: [true, 'la contraseña es obligatoria']
    },

    role:{
        type: String,
        require: true,
        enum: ["STUDENT_ROLE"]
    },

    estado:{
        type: Boolean,
        default:true
    },
    
    cursos:{
        type:String,
        ref:'Curso'
    }
});

module.exports = model('Alumno', AlumnoSchema);