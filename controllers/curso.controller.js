const bcryptjs = require('bcryptjs');
const Curso = require('../models/curso');

const { response, request } = require('express');

const cursosGet = async (req, res = response) => {

    const{limite, desde} = req.query;
    const query = {estado: true};
    
    const [total, cursos] = await Promise.all([

        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ]);

    res.status(200).json({
        total,
        cursos
    });

}

/*const getCursoById = async (req, res) => {
    const { id } = req.params;
    const curso =  await Curso.findById(id);

    res.status(200).json({
        curso

    });
}
*/

const getCursosByProfesor = async (req, res) => {
    const { profesor } = req.params;

    try {
        const cursos = await Curso.find({ profesor: profesor });

        if (!cursos || cursos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron cursos para este profesor.' });
        }

        res.status(200).json({ cursos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor.' });
    }
};

const cursosDelete =  async (req, res) =>{
    const { id } = req.params;
    const curso = await Curso.findByIdAndUpdate(id, { estado: false});

    res.status(200).json({

        msg: 'el curso ha sido eliminado exitosamente >:C',
        curso
    });
}

const putCurso = async (req, res = response) => {
   
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const curso = await Curso.findByIdAndUpdate(id, resto, { new: true });

    res.status(200).json({
        msg: 'El curso ha sido actualizado exitosamente :)',
        curso
    });
};

const cursosPost = async (req, res) => {
    const { materia, profesor, tiempo, descripcion } = req.body;
    const curso = new Curso({ materia, profesor, tiempo, descripcion });

    await curso.save();
    res.status(202).json({
        curso
    });
};

const obtenerCursoPorId = async (req, res) => {
    const cursoId = req.params.id;

    try {
        const curso = await Curso.findById(cursoId);
        if (!curso) {
            return res.status(404).json({ mensaje: 'Curso no encontrado' });
        }
        res.status(200).json({ curso });
    } catch (error) {
        console.error('Error al obtener el curso:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

module.exports = {
  //  getCursoById,
    cursosGet,
    cursosDelete,
    putCurso,
    cursosPost,
    obtenerCursoPorId,
    getCursosByProfesor
};