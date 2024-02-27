const { response } = require("express");

const esProfesor = (req, res, next) => {
    if(!req.profesor){
        return res.status(500).json({
            msg: "Se desea validar un usuario sin validar token primero"
        });
    }

    const { role, nombre } =  req.profesor;

    if(role !== "TEACHER_ROLE"){
        return res.status(401).json({
            msg: `${nombre} no es un profesor, no puede usar este endpoint`
        });
    };
    next();
}

const esAlumno = (req, res, next) => {
   
    if(!req.alumno){
        return res.status(500).json({
            msg: "Se desea validar un usuario sin validar token primero"
        });
    }

    const { role, nombre } =  req.alumno;

    if(role !== "STUDENT_ROLE"){
   
        return res.status(401).json({
            msg: `${nombre} no es un alumno, no puede usar este endpoint`
        });
    };
    next();
}

const tieneRolAutorizado = (...roles) => {
    return (req = require, res = response, next) => {
        if (!req.profesor) {
            return res.status(401).json({
                msg: "Acceso denegado. Este servicio solo está disponible para profesores."
            });
        }

        if (!roles.includes(req.profesor.role)) {
            return res.status(401).json({
                msg: "Acceso denegado. Este servicio solo está disponible para profesores."
            });
        }
        
        next();
    }
}



module.exports ={
    esAlumno,
    esProfesor,
    tieneRolAutorizado
}