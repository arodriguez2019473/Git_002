const bcryptjs = require('bcryptjs');
const Curso = require('../models/curso');

const { response, request } = require('express');

const cursosGet = async (req, res = response) => {

    const{ limite, desde } = req.query;
    const query = { estado: true };
    
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

const getCursoById = async (req, res) => {
    const { id } = req.params;
    const curso =  await Curso.findById(id);

    res.status(200).json({
        curso

    });
}

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

    res.status(200).json({
        msg: 'el curso a sido actualizado exitosamente :)',
        curso
    });

}

const cursosPost = async (req, res) => {
    const { materia, profesor, tiempo, descripcion } = req.body;
    const curso = new Curso({ materia, profesor, tiempo, descripcion });

    await curso.save();
    res.status(202).json({
        curso
    });
};

module.exports = {
    getCursoById,
    cursosGet,
    cursosDelete,
    putCurso,
    cursosPost
};