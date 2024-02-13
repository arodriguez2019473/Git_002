const mongoose = require('mongoose');

const dbConnection = async () =>{

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Base de datos a sido conectada');
    }

    catch(e){
        throw new Error('Erro en la conexion a base de datos', e);
    }
}

module.exports = {
    dbConnection
}