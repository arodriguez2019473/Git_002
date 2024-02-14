const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Base de datos ha sido conectada');
    }

    catch(e){
        throw new Error('Error en la conexion a base de datos: ' + e.message);
    }
}

module.exports = {
    dbConnection
}