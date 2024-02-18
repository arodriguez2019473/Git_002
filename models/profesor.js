const { Schema, model } = require('mongoose');

const ProfesorSchema = Schema({

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
        enum: ["TEACHER_ROLE"]
    },

    estado:{
        type: Boolean,
        default:true
    }
});

ProfesorSchema.methods.toJSON = function(){
    const { __v, password, _id, ...profesor } = this.toObject();
    profesor.uid = _id;
    return profesor;
};


module.exports = model('Profesor', ProfesorSchema);