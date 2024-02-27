const bcryptjs = require ('bcryptjs');
const Alumno = require('../models/alumno');
const { response, request } = require('express');

const alumnosGet = async (req, res = response) => {

    const{limite, desde} = req.query;
    const query = {estado: true}

    const [total, alumnos] = await Promise.all([

        Alumno.countDocuments(query),
        Alumno.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ]);

    res.status(200).json({

        total,
        alumnos
    });
}

const getalumnosById = async (req, res) =>{

    const {id} = req.params;
    const alumno = await Alumno.findOne({_id: id});

    res.status(200).json({

        alumno
    });
}

const alumnosDelete = async (req, res) => {

    const{id} = req.params;
    const alumno = await Alumno.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'El Alumno a sido eliminado exitosamente >:(',
        alumno
    })
}

const putAlumnos = async (req, res = response) => {

    const { id } = req.params;
    const{ _id, password, correo, nombre, ...resto } = req.body;

    if(password){

        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const alumno = await Alumno.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Usuario actualizado exitosamente >:)',
        alumno
    });
}

const alumnosPost = async (req, res) => {

    const {nombre, correo, password, role} = req.body;
    const alumno = new Alumno({nombre, correo, password, role});

    alumno.role = 'STUDENT_ROLE';

    const salt = bcryptjs.genSaltSync();
    alumno.password = bcryptjs.hashSync(password, salt);

    await alumno.save();
    res.status(202).json({
        alumno
    });

}

const agregarAlumnoACurso = async (req, res) => {
    const { idAlumno, idCurso } = req.body;

    try {
        // Verificar si tanto el alumno como el curso existen
        const alumno = await Alumno.findById(idAlumno);
        const curso = await Curso.findById(idCurso);

        if (!alumno || !curso) {
            return res.status(404).json({ error: 'Alumno o curso no encontrado' });
        }

        // Verificar si el alumno ya está inscrito en el curso
        if (alumno.cursos.includes(curso._id)) {
            return res.status(400).json({ error: 'El alumno ya está inscrito en este curso' });
        }

        // Agregar el curso al array de cursos del alumno y guardar los cambios
        alumno.cursos.push(curso._id);
        await alumno.save();

        res.status(200).json({ message: 'Alumno agregado al curso exitosamente' });
    } catch (error) {
        console.error('Error al agregar alumno al curso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};




module.exports = {
    agregarAlumnoACurso,
    getalumnosById,
    alumnosGet,
    alumnosDelete,
    putAlumnos,
    alumnosPost
}
